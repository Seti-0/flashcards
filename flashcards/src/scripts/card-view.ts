import * as utility from "./utility"
import * as cards from "./cards"
import * as keyboard from "./keyboard"
import * as undoRedo from "./undo-redo"

export {
    cardview_Init,
    cardview_setPage,
    cardview_setCardIDs,
    cardview_isEditing,
    // For the sake of undoRedo
    cardview_pageOf,
    cardview_addCardID,
    cardview_removeCard,
    cardview_onCardsChanged
};

let cardview_index:number[] = []
let cardview_page:number = 1
let cardview_editing:boolean = false

function cardview_onCardsChanged() {
    cardview_setCardIDs(cardview_index.filter(cards.cards_exists))
}

function cardview_setCardIDs(index: number[]) {
    cardview_index = index
    cardview_onCardIDsChanged()
}

function cardview_onCardIDsChanged() {
    $(".cardview-total-pages").text(cardview_index.length)
    cardview_checkPage()
    cardview_refreshPage()
}

function cardview_addCardID(cardID:number, page:(number|undefined)=undefined) {
    page ||= cardview_page
    cardview_index.splice(page - 1, 0, cardID)
    cardview_onCardIDsChanged()
}

function cardview_removeCard(page:(number|undefined)=undefined) {
    page ||= cardview_page
    cardview_index.splice(page - 1, 1)
    cardview_onCardIDsChanged()
}

function cardview_pageOf(cardID:number) {
    return cardview_index.indexOf(cardID) + 1
}

function cardview_getCurrentCardID() {
    if (cardview_index.length === 0) return undefined
    return cardview_index[cardview_getPage() - 1]
}

function cardview_getCurrentCard() {
    const index = cardview_getCurrentCardID()
    if (!index) return undefined
    return cards.cards_get(index)
}

function cardview_getPageCount() {
    return cardview_index.length
}

function cardview_getPage() {
    return cardview_page
}

function cardview_checkPage() {
    cardview_setPage(cardview_page)
}

function cardview_setPage(newValue:number) {

    newValue = Math.max(1, Math.min(newValue, cardview_getPageCount()))
    if (cardview_getPageCount() === 0)
        newValue = 0

    const $view = $(".cardview-current-page")
    if (newValue.toString() !== $view.html())
        $view.html(newValue.toString())

    if (newValue !== cardview_page) {
        cardview_page = newValue
        cardview_refreshPage()
    }

}

function cardview_Init() {

    $(".cardview-labels-add-list").hide()

    $(".cardview-title").on("input", function(){
        const $input = $(this)
        const card = cardview_getCurrentCard()
        const value = utility.cleanContent($input.html())
        undoRedo.undoRedo_editProperty(card, "title", value, function(){
            if ($input.html() !== card.title)
                $input.html(card.title)
        }, true)
    })

    $(".cardview-details").on("input", function(){
        const $input = $(this)
        const card = cardview_getCurrentCard()
        const value = utility.cleanContent($input.html())
        undoRedo.undoRedo_editProperty(card, "content", value, function(){
            if ($input.html() !== card.content)
                $input.html(card.content)
        }, true)
    })

    $(".cardview-show-answer").on("click", cardviewAnswer_toggle)
    $(".cardview-hide-answer").on("click", cardviewAnswer_toggle)

    $(".cardview-answer-text").on("input", function(){
        const $input = $(this)
        const card = cardview_getCurrentCard()
        const value = utility.cleanContent($input.html())
        undoRedo.undoRedo_editProperty(card, "answerContent", value, function(){
            if ($input.html() !== card.answerContent)
                $input.html(card.answerContent)
        }, true)
    })

    $(".cardview-nav-left").on("click", cardview_previousPage)
    $(".cardview-nav-right").on("click", cardview_nextPage)

    $(".cardview-current-page").on("input", function(){

        const userInput = $(this).html()
        const userPage = parseInt(userInput) || 1
        let page = Math.max(1, Math.min(userPage, cardview_getPageCount()))

        cardview_setPage(page)

        if (page.toString() !== userInput)
            utility.moveCursorToEnd()

        cardview_refreshPage()

    })

    $(".cardview-config-toggle").on("click", cardview_toggleConfig)

    $(".cardview-delete").on("click", function() {
        const cardID = cardview_getCurrentCardID()
        if (cardID) undoRedo.undoRedo_deleteCard(cardID)
    })

    $(".cardview-edit").on("click", cardview_toggleEditing)

    cardviewOptions_init()
    cardviewCompletion_init()
    cardviewDifficulty_init()
    cardviewLabels_init()

    cardview_initShortcuts()

    cardview_setCardIDs([])

}

function cardview_initShortcuts() {

    function register(key:string|string[], action:Function) {
        keyboard.keyboard_addShortcut({
            "key": key,
            "action": action
        })
    }

    register(["ArrowLeft", "a"], cardview_previousPage)
    register(["ArrowRight", "d"], cardview_nextPage)

    register(" ", cardviewAnswer_toggle)
    register("q", cardview_toggleConfig)
    register("e", cardview_toggleEditing)

    for (let i = 1; i < 10; i++)
        register(i.toString(), () => {
            if (cardviewAnswer_isVisible()) {
                if (i < 6) cardviewDifficulty_setValue(i)
                else {
                    let value
                    if (i === 6) value = "untried"
                    else if (i === 7) value = "incorrect"
                    else value = "correct"
                    // @ts-ignore
                    cardviewCompletion_setValue(value)
                }
            } else {
                    cardviewOptions_selectNumber(i)
                    cardviewOptions_showAnswer()
            }
        })

}

function cardview_nextPage() {

    let page = cardview_getPage()

    page++;
    if (page > cardview_getPageCount())
        page = 1;

    cardviewLabels_hideAddList()
    if (!cardview_isEditing())
        cardviewAnswer_hide()

    cardview_setPage(page)

}

function cardview_previousPage() {

    let page = cardview_getPage()

    page--;
    if (page < 1)
        page = cardview_getPageCount();

    cardviewLabels_hideAddList()
    if (!cardview_isEditing())
        cardviewAnswer_hide()

    cardview_setPage(page)

}

function cardview_refreshPage() {

    const $titleView = $(".cardview-title")
    const $contentView = $(".cardview-details")
    const $imgView = $(".cardview-image")
    const $answerView = $(".cardview-answer-text")
    const $emptyMsgs = $(".cardview-empty-message, .cardview-config-empty-message")

    const card = cardview_getCurrentCard()
    if (!card) {
        $emptyMsgs.show()
        $titleView.hide()
        $contentView.hide()
        $imgView.hide()
        $answerView.hide()
    } else {
        $emptyMsgs.hide()

        const title = card.title || ""
        $titleView.html(title);
        utility.hideIfEmpty($titleView)

        const content = card.content || ""
        $contentView.html(content);
        utility.hideIfEmpty($contentView)

        const imgName = card.img_name
        if (imgName) {
            const imgSrc = "data/images/" + imgName
            $imgView.attr("src", imgSrc)
            $imgView.show("fast")
        } else {
            $imgView.hide("fast")
        }

        const answerContent = card.answerContent || "(No content)"
        $answerView.html(answerContent)
        utility.hideIfEmpty($answerView)
    }

    cardviewOptions_refresh()
    cardviewCompletion_refresh()
    cardviewDifficulty_refresh()
    cardviewLabels_refresh()

}

function cardview_toggleEditing() {
    if (cardview_isEditing())
        cardview_stopEditing()
    else if(cardview_getCurrentCard())
        cardview_startEditing()
}

function cardview_isEditing() {
    return cardview_editing
}

function cardview_startEditing() {
    cardview_editing = true
    $(".cardview-edit").css("background-color", "#eee")
    $(".cardview-title").prop("contenteditable", true)
    $(".cardview-details").prop("contenteditable", true)
    cardviewOptions_startEditing()
    $(".cardview-show-answer").hide("fast")
    $(".cardview-hide-answer").hide("fast")
    $(".cardview-answer").show("fast")
    $(".cardview-answer-text").prop("contenteditable", true)
    cardview_refreshPage()
}

function cardview_stopEditing() {
    cardview_editing = false
    $(".cardview-edit").css("background-color", "#00000000")
    $(".cardview-title").prop("contenteditable", false)
    $(".cardview-details").prop("contenteditable", false)
    cardviewOptions_stopEditing()
    $(".cardview-show-answer").show("fast")
    $(".cardview-hide-answer").show("fast")
    $(".cardview-answer").hide("fast")
    $(".cardview-answer-text").prop("contenteditable", false)
    cardview_refreshPage()
}

function cardview_toggleConfig() {
    $(".cardview-config").toggle("fast")
}

/*

    CARDVIEW - ANSWER

 */

let cardviewAnswer_visible = false

function cardviewAnswer_toggle() {

    if (cardviewAnswer_isVisible())
        cardviewAnswer_hide()

    else cardviewAnswer_show()

}

function cardviewAnswer_isVisible() {
    return cardviewAnswer_visible
}

function cardviewAnswer_show() {

    cardviewAnswer_visible = true

    $(".cardview-show-answer").hide("fast")
    $(".cardview-answer").show("fast")

    cardviewOptions_showAnswer()

}

function cardviewAnswer_hide() {

    cardviewAnswer_visible = false

    cardviewOptions_hideAnswer()

    $(".cardview-answer").hide("fast")
    $(".cardview-show-answer").show("fast")

}

/*

    CARDVIEW - OPTIONS

*/

function cardviewOptions_init() {

    const optionsView = $(".cardview-options")
    const listView = $(".cardview-options-list")

    listView.on("click", ".cardview-option", function(){
        if (!cardview_isEditing())
            cardviewOptions_select(this)
    })

    listView.on("mouseenter", ".cardview-option-correctness img", function(){
        $(this).attr("src", "images/red-dot-light.svg")
    })

    listView.on("mouseleave", ".cardview-option-correctness img", function(){
        $(this).attr("src", "images/red-dot.svg")
    })

    listView.on("click", ".cardview-option-correctness", function(){
        const $option = $(this).parent(".cardview-option")
        const index = parseInt(<string>$option.attr("data-index"))
        const card = cardview_getCurrentCard()
        undoRedo.undoRedo_editProperty(card, "correct", index + 1, cardviewOptions_refresh)
    })

    listView.on("input", ".cardview-option-content", function() {
        const $content = $(this)
        const $option = $content.parent(".cardview-option")
        const content = utility.cleanContent($content.html())
        const index = parseInt(<string>$option.attr("data-index"))
        const options = cardview_getCurrentCard().options
        options[index] = content
        undoRedo.undoRedo_editProperty(options, index, content, cardviewOptions_refresh, true)
    })

    listView.on("click", ".cardview-option-delete", function(){
        const $option = $(this).parent(".cardview-option")
        const index = parseInt(<string>$option.attr("data-index"))
        const card = cardview_getCurrentCard()
        undoRedo.undoRedo_deleteListItem(card.options, index, cardviewOptions_refresh)
    })

    optionsView.on("click", ".cardview-options-new", function(){
        const card = cardview_getCurrentCard()
        const value = "Option #" + (card.options.length + 1)
        undoRedo.undoRedo_pushListItem(card.options, value, cardviewOptions_refresh)
    })

}

function cardviewOptions_refresh(speed : ("slow"|"fast"|undefined) = "fast") {

    const card = cardview_getCurrentCard()
    if (card)
        $(".cardview-options").show()
    else {
        $(".cardview-options").hide()
        return
    }

    const options = card.options || []
    const correct = card.correct || 0

    const $listView = $(".cardview-options-list")

    const current_n = $listView.children().length
    const target_n = options.length

    if (current_n < target_n) {

        // Add any missing items

        for (let i = current_n; i < options.length; i++) {

            const $li = $(`
            <li class="cardview-option" data-index="${i}">
                <button class="cardview-option-correctness">
                    <img alt="incorrect" src="images/red-dot.svg">
                </button>
                <span class="cardview-option-number">${i + 1})</span>
                <span class="cardview-option-content" data-placeholder="(Option Content)"></span>
                <button class="cardview-option-delete">
                    <img alt="delete" src="images/delete.svg">
                </button>
            </li>
        `)

            $listView.append($li)
            $li.hide()
            // @ts-ignore
            $li.show(speed)

        }

    } else if (current_n > target_n) {

        // Remove any extra items

        for (let i = 0; i < current_n - target_n; i++) {
            const $toRemove = $listView.children().last()
            $toRemove.hide(speed, function(){
                $toRemove.remove()
            })
        }

    }

    // Update existing items

    $listView.children().each(function (i) {

        const $li = $(this)
        const $content = $li.find(".cardview-option-content")

        if ($content.html() !== options[i])
            $content.html(options[i])

        const $correctnessImg = $li.find(".cardview-option-correctness")

        if (correct === i+1) {
            $li.addClass("cardview-correct-secret")
            $correctnessImg.removeClass("icon-incorrect")
            $correctnessImg.addClass("icon-correct")
        } else {
            $li.removeClass("cardview-correct-secret")
            $correctnessImg.removeClass("icon-correct")
            $correctnessImg.addClass("icon-incorrect")
        }

        if (cardview_isEditing()) {
            $li.find(".cardview-option-content").attr("contenteditable", "true")
            $li.find(".cardview-option-correctness").show(speed)
            $li.find(".cardview-option-delete").show(speed)
        } else {
            $li.find(".cardview-option-content").attr("contenteditable", "false")
            $li.find(".cardview-option-correctness").hide(speed)
            $li.find(".cardview-option-delete").hide(speed)
        }

    })

    utility.hideIfEmpty($listView)

}

function cardviewOptions_select(element:Element) {
    $(".cardview-selected").removeClass("cardview-selected")
    $(element).addClass("cardview-selected")
}

function cardviewOptions_selectNumber(number:number) {
    const options = document
        .querySelector(".cardview-options-list")
        ?.children

    if (!options || options.length === 0)
        return

    number = Math.max(1, Math.min(number, options.length))
    cardviewOptions_select(options[number - 1])
}

function cardviewOptions_showAnswer() {
    const $correct = $(".cardview-correct-secret")
    const $selected = $(".cardview-selected")
    const card = cardview_getCurrentCard()

    if ($correct.is($selected))
        card.completion = "correct"
    else
        card.completion = "incorrect"

    cardviewCompletion_refresh()

    $(".cardview-correct").removeClass("cardview-correct")
    $(".cardview-incorrect").removeClass("cardview-incorrect")

    $correct.addClass("cardview-correct")
    $selected.addClass("cardview-incorrect")
    $selected.removeClass("cardview-selected")
}

function cardviewOptions_hideAnswer() {
    $(".cardview-incorrect").removeClass("cardview-incorrect")
    $(".cardview-correct-secret").removeClass("cardview-correct")
}

function cardviewOptions_startEditing() {
    cardviewOptions_hideAnswer()
    $(".cardview-selected").removeClass("cardview-selected")
    $(".cardview-options-new").show("fast")
    cardviewOptions_refresh()
}

function cardviewOptions_stopEditing() {
    $(".cardview-options-new").hide("fast")
    cardviewOptions_refresh()
}

/*

    CARDVIEW - COMPLETION

*/

function cardviewCompletion_init() {

    const $listView = $(".cardview-completion")

    $listView.on("mouseenter", "img", function() {
        $(this).attr("src", "images/red-dot-light-interior.svg")
    })

    $listView.on("mouseleave", "img", function() {
        const element = $(this)
        if (element.parent("button").attr("data-value") === cardviewCompletion_getValue())
            element.attr("src", "images/red-dot.svg")
        else
            element.attr("src", "images/red-dot-empty.svg")
    })

    $listView.on("click", "button", function() {
        const value = $(this).attr("data-value")
        // @ts-ignore
        cardviewCompletion_setValue(value)
    })

}

function cardviewCompletion_refresh() {
    const $view = $(".cardview-completion")

    if (!cardview_getCurrentCard()) {
        $view.hide()
        return
    }


    $view
        .show()
        .find("img")
        .each((i, element) => {

            const $element = $(element)
            if ($element.parent("button").attr("data-value") === cardviewCompletion_getValue())
                $element.attr("src", "images/red-dot.svg")
            else
                $element.attr("src", "images/red-dot-empty.svg")

        })
}

function cardviewCompletion_setValue(value:"correct"|"incorrect"|"untried") {
    const card = cardview_getCurrentCard()
    undoRedo.undoRedo_editProperty(card, "completion", value, cardviewCompletion_refresh)
}

function cardviewCompletion_getValue() {
    return cardview_getCurrentCard().completion || "untried"
}

/*

    CARDVIEW - DIFFICULTY

*/

function cardviewDifficulty_init() {

    const $listView = $(".cardview-difficulty-list")

    $listView.on("mouseenter", "img", function() {
        $(this).attr("src", "images/star-filled-light.svg")
    })

    $listView.on("mouseleave", "img", function() {
        const $img = $(this)
        // @ts-ignore
        if ($img.parent("button").attr("data-n") <= cardviewDifficulty_getValue())
            $img.attr("src", "images/star-filled.svg")
        else
            $img.attr("src", "images/star-empty.svg")
    })

    $listView.on("click", "button", function() {
        const value = $(this).attr("data-n")
        // @ts-ignore
        cardviewDifficulty_setValue(value)
    })

}

function cardviewDifficulty_refresh() {

    const $view = $(".cardview-difficulty")
    if (!cardview_getCurrentCard()) {
        $view.hide()
        return
    }
    else $view.show()

    $(".cardview-difficulty-list")
        .find("img")
        .each((i, element) => {

            const $element = $(element)

            // @ts-ignore
            if ($element.parent("button").attr("data-n") <= cardviewDifficulty_getValue())
                $element.attr("src", "images/star-filled.svg")
            else
                $element.attr("src", "images/star-empty.svg")

        })
}

function cardviewDifficulty_setValue(number:number) {
    number = Math.max(1, Math.min(number, 5))
    const card = cardview_getCurrentCard()
    undoRedo.undoRedo_editProperty(card, "difficulty", number, cardviewDifficulty_refresh)
}

function cardviewDifficulty_getValue() {
    return cardview_getCurrentCard().difficulty || 1
}

/*

    CARDVIEW - LABELS

*/

function cardviewLabels_init() {

    cardviewLabels_refreshAddList()

    const labelsView = $(".cardview-labels")

    labelsView.on("input", "input[type=text]", function() {
        const input = $(this)
        const label = cardviewLabels_getLabel(input.parents("li"))
        undoRedo.undoRedo_editProperty(label, "name", input.val(), cardviewLabels_updateText, true)
    })

    labelsView.on("input", ".cardview-label-bg", function() {
        const $input = $(this)
        const target = cardviewLabels_getLabel($input.parents("li"))
        undoRedo.undoRedo_editProperty(target, "color", $input.val(), cardviewLabels_updateColors)
    })

    labelsView.on("input", ".cardview-label-color", function() {
        const $input = $(this)
        const target = cardviewLabels_getLabel($input.parents("li"))
        undoRedo.undoRedo_editProperty(target, "textColor", $input.val(), cardviewLabels_updateColors)
    })

    labelsView.on("mouseenter", "li", function() {
        $(this).find(".cardview-label-buttons").show("fast")
    })

    labelsView.on("mouseleave", "li", function() {
        $(this).find(".cardview-label-buttons").hide("fast")
    })

    labelsView.on("click", ".cardview-label-remove", function() {
        const labelID = cardviewLabels_getLabelID($(this).parents("li"))
        const labels = cardview_getCurrentCard().labels
        const index = labels.indexOf(labelID)
        if (index > -1)
            undoRedo.undoRedo_deleteListItem(labels, index, cardviewLabels_refresh)
    })

    labelsView.on("click", ".cardview-label-delete", function(e) {

        const $li = $(this).parents("li")
        const label = cardviewLabels_getLabel($li)

        undoRedo.undoRedo_deleteLabel(label.id, function() {
            cardviewLabels_refresh()
            cardviewLabels_refreshAddList()
        })

        e.stopPropagation()
    })

    labelsView.on("click", ".cardview-label-edit", function(event) {
        const li = $(this).parents("li")
        cardviewLabels_toggleEditing(li)
        event.stopPropagation()
    })

    labelsView.on("mouseenter", "img", function(){
        const img = $(this)
        const li = img.parents("li")

        const color = li.css("background-color")
        const lightColor = utility.mapColor(color,
            (r:number, g:number, b:number) => {
                const amount = (255 - Math.min(r, g, b))/3
                return [r + amount, g + amount, b + amount]
            })
        img.css("background-color", lightColor)
    })

    labelsView.on("mouseleave", "img", function(){
        $(this).css("background-color", "#00000000")
    })

    labelsView.on("focusout", "li", function() {
        if (!this.matches(":focus-within"))
            cardviewLabels_stopEditing($(this))
    })

    labelsView.on("click", ".cardview-labels-add", function() {
        cardviewLabels_toggleAddList()
    })

    labelsView.on("focusout", ".cardview-labels-add-list", function() {
        if (!this.matches(":focus-within"))
            cardviewLabels_hideAddList()
    })

    labelsView.on("click", ".cardview-labels-add-list li", function() {
        const $li = $(this)
        if (!cardviewLabels_isEditing($li)) {
            cardviewLabels_hideAddList()
            const card = cardview_getCurrentCard()
            const labelID = cardviewLabels_getLabelID($li)
            undoRedo.undoRedo_pushListItem(card.labels, labelID, cardviewLabels_refresh)
        }
    })

    labelsView.on("click", ".cardview-labels-new", function(){
        undoRedo.undoRedo_createNewLabel(function() {
            cardviewLabels_refreshAddList()
            const $latest = $(".cardview-labels-add-list")
                .find("li:last-child")
            cardviewLabels_startEditing($latest)
        })
    })

}

function cardviewLabels_updateText() {
    $(".cardview-label")
        .each(function(index, li) {
            const $li = $(li)
            const label = cardviewLabels_getLabel($li)
            $li.find("input[type=text]").val(label.name)
        })
}

function cardviewLabels_updateColors() {
    $(".cardview-label")
        .each(function(index, li) {
            const $li = $(li)
            const label = cardviewLabels_getLabel($li)
            const color = label.color || "#bab0b0"
            const textColor = label.textColor || "#ffffff"
            $li.css({
                "color": textColor,
                "background-color": color
            })
            $li.find(".cardview-label-bg").val(color)
            $li.find(".cardview-label-color").val(textColor)
        })
}

function cardviewLabels_toggleEditing(labelLi:any) {
    if (!cardviewLabels_isEditing(labelLi))
        cardviewLabels_startEditing(labelLi)
    else
        cardviewLabels_stopEditing(labelLi)
}

function cardviewLabels_isEditing(labelLi:any) {
    return !labelLi.find(".cardview-label-text").prop("disabled")
}

function cardviewLabels_startEditing(labelLi:any) {
    labelLi.find(".cardview-label-colors").show("fast")
    const text = labelLi.find(".cardview-label-text")
    text.prop("disabled", false)

    text.trigger("select")
    labelLi[0].scrollIntoView()
}

function cardviewLabels_stopEditing(labelLi:any) {
    labelLi.find(".cardview-label-colors").hide("fast")
    const text = labelLi.find(".cardview-label-text")
    text.prop("disabled", true)
}

function cardviewLabels_refresh() {

    const card = cardview_getCurrentCard()
    const $view = $(".cardview-labels")
    if (card) $view.show()
    else {
        $view.hide()
        return
    }

    const cardLabels = card.labels || []

    const $listView = $(".cardview-labels-list")

    $listView.html("")
    for (let labelID of cardLabels) {
        const label = cards.cards_getLabel(labelID)
        if (typeof(label) === "undefined") {
            console.log("Unable to read card label: "+labelID)
            continue
        }

        $listView.append(cardviewLabels_createElement(
            label,
            "cardview-label-remove"
        ))
    }

}

function cardviewLabels_refreshAddList() {
    const $listView = $(".cardview-labels-add-list").find("ol")

    $listView.html("")
    for (let label of cards.cards_getLabels()) {
        $listView.append(cardviewLabels_createElement(
            label, "cardview-label-delete"
        ))
    }
}

function cardviewLabels_getLabelID(labelElement:any) {
    const $labelElement = $(labelElement)
    // @ts-ignore
    return parseInt($labelElement.attr("data-value"))
}

function cardviewLabels_getLabel(labelElement:any) {
    return cards.cards_getLabel(cardviewLabels_getLabelID(labelElement))
}

function cardviewLabels_createElement(label:any, removalClass:string) {

    const labelID = label.id;
    const labelText = label.name || "(no name)"
    const labelBgColor = label.color || "#bab0b0"
    const labelTextColor = label.textColor || "#ffffff"

    const $li = $(`
            <li class="cardview-label" data-value="${labelID}">
                <div class="cardview-label-row1">
                    <input class="cardview-label-text" type="text" value="${labelText}">
                    <span class="cardview-label-buttons">
                        <button class="cardview-label-edit"><img alt="edit" src="images/draw.svg"></button>
                        <button class="${removalClass}"><img alt="remove" src="images/delete.svg"></button>
                    </span>
                </div>
                <div class="cardview-label-row2 cardview-label-colors">
                    <input class="cardview-label-bg" type="color" value="${labelBgColor}">
                    <input class="cardview-label-color" type="color" value="${labelTextColor}">
                </div>
            </li>`)

    $li.css({
        "color": labelTextColor,
        "background-color": labelBgColor
    })

    $li.find(".cardview-label-text").prop("disabled", true)
    $li.find(".cardview-label-colors").hide()
    $li.find(".cardview-label-buttons").hide()

    return $li

}

function cardviewLabels_toggleAddList(speed: ("fast"|"slow") ="fast") {
    $(".cardview-labels-add-list").toggle(speed)
}

function cardviewLabels_hideAddList(speed: ("fast"|"slow") ="fast") {
    $(".cardview-labels-add-list").hide(speed)
}
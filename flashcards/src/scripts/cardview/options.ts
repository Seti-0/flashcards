import * as undoRedo from "../undo-redo";
import * as utility from "../utility";
import * as cardview from "../card-view";
import * as completion from "./completion"

export {
    init,
    refresh,
    showAnswer,
    hideAnswer,
    isAnswerVisible,
    selectNumber,
    startEditing,
    stopEditing
}

function init() {

    const optionsView = $(".cardview-options")
    const listView = $(".cardview-options-list")

    listView.on("click", ".cardview-option", function(){
        if (!cardview.isEditing())
            select(this)
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
        const card = cardview.getCurrentCard()
        undoRedo.editProperty(card, "correct", index + 1, refresh)
    })

    listView.on("input", ".cardview-option-content", function() {
        const $content = $(this)
        const $option = $content.parent(".cardview-option")
        const content = utility.cleanContent($content.html())
        const index = parseInt(<string>$option.attr("data-index"))
        const options = cardview.getCurrentCard().options
        options[index] = content
        undoRedo.editProperty(options, index, content, refresh, true)
    })

    listView.on("click", ".cardview-option-delete", function(){
        const $option = $(this).parent(".cardview-option")
        const index = parseInt(<string>$option.attr("data-index"))
        const card = cardview.getCurrentCard()
        undoRedo.deleteListItem(card.options, index, refresh)
    })

    optionsView.on("click", ".cardview-options-new", function(){
        const card = cardview.getCurrentCard()
        const value = "Option #" + (card.options.length + 1)
        undoRedo.pushListItem(card.options, value, refresh)
    })

}

function refresh(speed : ("slow"|"fast"|undefined) = "fast") {

    const card = cardview.getCurrentCard()
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

        if (cardview.isEditing()) {
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

function select(element:Element) {
    $(".cardview-selected").removeClass("cardview-selected")
    $(element).addClass("cardview-selected")
}

function selectNumber(number:number) {
    const options = document
        .querySelector(".cardview-options-list")
        ?.children

    if (!options || options.length === 0)
        return

    number = Math.max(1, Math.min(number, options.length))
    select(options[number - 1])
}

let answerVisible = false

function showAnswer() {
    answerVisible = true
    const $correct = $(".cardview-correct-secret")
    const $selected = $(".cardview-selected")
    const card = cardview.getCurrentCard()

    if ($correct.is($selected))
        card.completion = "correct"
    else
        card.completion = "incorrect"

    completion.refresh()

    $(".cardview-correct").removeClass("cardview-correct")
    $(".cardview-incorrect").removeClass("cardview-incorrect")

    $correct.addClass("cardview-correct")
    $selected.addClass("cardview-incorrect")
    $selected.removeClass("cardview-selected")
}

function hideAnswer() {
    answerVisible = false
    $(".cardview-incorrect").removeClass("cardview-incorrect")
    $(".cardview-correct-secret").removeClass("cardview-correct")
}

function isAnswerVisible() {
    return answerVisible
}

function startEditing() {
    hideAnswer()
    $(".cardview-selected").removeClass("cardview-selected")
    $(".cardview-options-new").show("fast")
    refresh()
}

function stopEditing() {
    $(".cardview-options-new").hide("fast")
    refresh()
}

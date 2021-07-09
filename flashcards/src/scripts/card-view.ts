import * as utility from "./utility"
import * as cards from "./cards"
import * as keyboard from "./keyboard"
import * as undoRedo from "./undo-redo"

import * as answerView from "./cardview/answer"
import * as completionView from "./cardview/completion"
import * as difficultyView from "./cardview/difficulty"
import * as labelsView from "./cardview/labels"
import * as optionsView from "./cardview/options"

export {
    init,
    setPage,
    setCardIDs,
    isEditing,
    // For the sake of undoRedo
    pageOf,
    addCardID,
    removeCard,
    onCardsChanged,
    // For the sake of child components
    getCurrentCard
};

let cardview_index:number[] = []
let cardview_page:number = 1
let cardview_editing:boolean = false

function onCardsChanged() {
    setCardIDs(cardview_index.filter(cards.exists))
}

function setCardIDs(index: number[]) {
    cardview_index = index
    onCardIDsChanged()
}

function onCardIDsChanged() {
    $(".cardview-total-pages").text(cardview_index.length)
    checkPage()
    refreshPage()
}

function addCardID(cardID:number, page:(number|undefined)=undefined) {
    page ||= cardview_page
    cardview_index.splice(page - 1, 0, cardID)
    onCardIDsChanged()
}

function removeCard(page:(number|undefined)=undefined) {
    page ||= cardview_page
    cardview_index.splice(page - 1, 1)
    onCardIDsChanged()
}

function pageOf(cardID:number) {
    return cardview_index.indexOf(cardID) + 1
}

function getCurrentCardID() {
    if (cardview_index.length === 0) return undefined
    return cardview_index[getPage() - 1]
}

function getCurrentCard() {
    const index = getCurrentCardID()
    if (!index) return undefined
    return cards.get(index)
}

function getPageCount() {
    return cardview_index.length
}

function getPage() {
    return cardview_page
}

function checkPage() {
    setPage(cardview_page)
}

function setPage(newValue:number) {

    newValue = Math.max(1, Math.min(newValue, getPageCount()))
    if (getPageCount() === 0)
        newValue = 0

    const $view = $(".cardview-current-page")
    if (newValue.toString() !== $view.html())
        $view.html(newValue.toString())

    if (newValue !== cardview_page) {
        cardview_page = newValue
        refreshPage()
    }

}

function init() {

    $(".cardview-labels-add-list").hide()

    $(".cardview-title").on("input", function(){
        const $input = $(this)
        const card = getCurrentCard()
        const value = utility.cleanContent($input.html())
        undoRedo.editProperty(card, "title", value, function(){
            if ($input.html() !== card.title)
                $input.html(card.title)
        }, true)
    })

    $(".cardview-details").on("input", function(){
        const $input = $(this)
        const card = getCurrentCard()
        const value = utility.cleanContent($input.html())
        undoRedo.editProperty(card, "content", value, function(){
            if ($input.html() !== card.content)
                $input.html(card.content)
        }, true)
    })

    $(".cardview-show-answer").on("click", answerView.toggle)
    $(".cardview-hide-answer").on("click", answerView.toggle)

    $(".cardview-answer-text").on("input", function(){
        const $input = $(this)
        const card = getCurrentCard()
        const value = utility.cleanContent($input.html())
        undoRedo.editProperty(card, "answerContent", value, function(){
            if ($input.html() !== card.answerContent)
                $input.html(card.answerContent)
        }, true)
    })

    $(".cardview-nav-left").on("click", previousPage)
    $(".cardview-nav-right").on("click", nextPage)

    $(".cardview-current-page").on("input", function(){

        const userInput = $(this).html()
        const userPage = parseInt(userInput) || 1
        let page = Math.max(1, Math.min(userPage, getPageCount()))

        setPage(page)

        if (page.toString() !== userInput)
            utility.moveCursorToEnd()

        refreshPage()

    })

    $(".cardview-config-toggle").on("click", toggleConfig)

    $(".cardview-delete").on("click", function() {
        const cardID = getCurrentCardID()
        if (cardID) undoRedo.deleteCard(cardID)
    })

    $(".cardview-edit").on("click", toggleEditing)

    optionsView.init()
    completionView.init()
    difficultyView.init()
    labelsView.init()

    initShortcuts()

    setCardIDs([])

}

function initShortcuts() {

    function register(key:string|string[], action:Function) {
        keyboard.addShortcut({
            "key": key,
            "action": action
        })
    }

    register(["ArrowLeft", "a"], previousPage)
    register(["ArrowRight", "d"], nextPage)

    register(" ", answerView.toggle)
    register("q", toggleConfig)
    register("e", toggleEditing)

    for (let i = 1; i < 10; i++)
        register(i.toString(), () => {
            if (optionsView.isAnswerVisible()) {
                if (i < 6) difficultyView.setValue(i)
                else {
                    let value
                    if (i === 6) value = "untried"
                    else if (i === 7) value = "incorrect"
                    else value = "correct"
                    // @ts-ignore
                    cardviewCompletion_setValue(value)
                }
            } else {
                    optionsView.selectNumber(i)
                    optionsView.showAnswer()
            }
        })

}

function nextPage() {

    let page = getPage()

    page++;
    if (page > getPageCount())
        page = 1;

    labelsView.hideAddList()
    if (!isEditing())
        answerView.hide()

    setPage(page)

}

function previousPage() {

    let page = getPage()

    page--;
    if (page < 1)
        page = getPageCount();

    labelsView.hideAddList()
    if (!isEditing())
        answerView.hide()

    setPage(page)

}

function refreshPage() {

    const $titleView = $(".cardview-title")
    const $contentView = $(".cardview-details")
    const $imgView = $(".cardview-image")
    const $answerView = $(".cardview-answer-text")
    const $emptyMsgs = $(".cardview-empty-message, .cardview-config-empty-message")

    const card = getCurrentCard()
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

    optionsView.refresh()
    completionView.refresh()
    difficultyView.refresh()
    labelsView.refresh()

}

function toggleEditing() {
    if (isEditing())
        stopEditing()
    else if(getCurrentCard())
        startEditing()
}

function isEditing() {
    return cardview_editing
}

function startEditing() {
    cardview_editing = true
    $(".cardview-edit").css("background-color", "#eee")
    $(".cardview-title").prop("contenteditable", true)
    $(".cardview-details").prop("contenteditable", true)
    optionsView.startEditing()
    $(".cardview-show-answer").hide("fast")
    $(".cardview-hide-answer").hide("fast")
    $(".cardview-answer").show("fast")
    $(".cardview-answer-text").prop("contenteditable", true)
    refreshPage()
}

function stopEditing() {
    cardview_editing = false
    $(".cardview-edit").css("background-color", "#00000000")
    $(".cardview-title").prop("contenteditable", false)
    $(".cardview-details").prop("contenteditable", false)
    optionsView.stopEditing()
    $(".cardview-show-answer").show("fast")
    $(".cardview-hide-answer").show("fast")
    $(".cardview-answer").hide("fast")
    $(".cardview-answer-text").prop("contenteditable", false)
    refreshPage()
}

function toggleConfig() {
    $(".cardview-config").toggle("fast")
}
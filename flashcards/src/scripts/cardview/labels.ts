import * as undoRedo from "../undo-redo";
import * as utility from "../utility";
import * as cards from "../cards";
import * as cardview from "../card-view"

export {
    init,
    refresh,
    hideAddList
}

function init() {

    refreshAddList()

    const labelsView = $(".cardview-labels")

    labelsView.on("input", "input[type=text]", function() {
        const input = $(this)
        const label = getLabel(input.parents("li"))
        undoRedo.editProperty(label, "name", input.val(), updateText, true)
    })

    labelsView.on("input", ".cardview-label-bg", function() {
        const $input = $(this)
        const target = getLabel($input.parents("li"))
        undoRedo.editProperty(target, "color", $input.val(), updateColors)
    })

    labelsView.on("input", ".cardview-label-color", function() {
        const $input = $(this)
        const target = getLabel($input.parents("li"))
        undoRedo.editProperty(target, "textColor", $input.val(), updateColors)
    })

    labelsView.on("mouseenter", "li", function() {
        $(this).find(".cardview-label-buttons").show("fast")
    })

    labelsView.on("mouseleave", "li", function() {
        $(this).find(".cardview-label-buttons").hide("fast")
    })

    labelsView.on("click", ".cardview-label-remove", function() {
        const labelID = getLabelID($(this).parents("li"))
        const labels = cardview.getCurrentCard().labels
        const index = labels.indexOf(labelID)
        if (index > -1)
            undoRedo.deleteListItem(labels, index, refresh)
    })

    labelsView.on("click", ".cardview-label-delete", function(e) {

        const $li = $(this).parents("li")
        const label = getLabel($li)

        undoRedo.deleteLabel(label.id, function() {
            refresh()
            refreshAddList()
        })

        e.stopPropagation()
    })

    labelsView.on("click", ".cardview-label-edit", function(event) {
        const li = $(this).parents("li")
        toggleEditing(li)
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
            stopEditing($(this))
    })

    labelsView.on("click", ".cardview-labels-add", function() {
        toggleAddList()
    })

    labelsView.on("focusout", ".cardview-labels-add-list", function() {
        if (!this.matches(":focus-within"))
            hideAddList()
    })

    labelsView.on("click", ".cardview-labels-add-list li", function() {
        const $li = $(this)
        if (!isEditing($li)) {
            hideAddList()
            const card = cardview.getCurrentCard()
            const labelID = getLabelID($li)
            undoRedo.pushListItem(card.labels, labelID, refresh)
        }
    })

    labelsView.on("click", ".cardview-labels-new", function(){
        undoRedo.createNewLabel(function() {
            refreshAddList()
            const $latest = $(".cardview-labels-add-list")
                .find("li:last-child")
            startEditing($latest)
        })
    })

}

function updateText() {
    $(".cardview-label")
        .each(function(index, li) {
            const $li = $(li)
            const label = getLabel($li)
            $li.find("input[type=text]").val(label.name)
        })
}

function updateColors() {
    $(".cardview-label")
        .each(function(index, li) {
            const $li = $(li)
            const label = getLabel($li)
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

function toggleEditing(labelLi:any) {
    if (!isEditing(labelLi))
        startEditing(labelLi)
    else
        stopEditing(labelLi)
}

function isEditing(labelLi:any) {
    return !labelLi.find(".cardview-label-text").prop("disabled")
}

function startEditing(labelLi:any) {
    labelLi.find(".cardview-label-colors").show("fast")
    const text = labelLi.find(".cardview-label-text")
    text.prop("disabled", false)

    text.trigger("select")
    labelLi[0].scrollIntoView()
}

function stopEditing(labelLi:any) {
    labelLi.find(".cardview-label-colors").hide("fast")
    const text = labelLi.find(".cardview-label-text")
    text.prop("disabled", true)
}

function refresh() {

    const card = cardview.getCurrentCard()
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
        const label = cards.getLabel(labelID)
        if (typeof(label) === "undefined") {
            console.log("Unable to read card label: "+labelID)
            continue
        }

        $listView.append(createElement(
            label, "cardview-label-remove"
        ))
    }

}

function refreshAddList() {
    const $listView = $(".cardview-labels-add-list").find("ol")

    $listView.html("")
    for (let label of cards.getLabels()) {
        $listView.append(createElement(
            label, "cardview-label-delete"
        ))
    }
}

function getLabelID(labelElement:any) {
    const $labelElement = $(labelElement)
    // @ts-ignore
    return parseInt($labelElement.attr("data-value"))
}

function getLabel(labelElement:any) {
    return cards.getLabel(getLabelID(labelElement))
}

function createElement(label:any, removalClass:string) {

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

function toggleAddList(speed: ("fast"|"slow") ="fast") {
    $(".cardview-labels-add-list").toggle(speed)
}

function hideAddList(speed: ("fast"|"slow") ="fast") {
    $(".cardview-labels-add-list").hide(speed)
}
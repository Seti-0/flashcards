import * as undoRedo from "../undo-redo";
import {getCurrentCard} from "../card-view";

export {
    init,
    refresh
}

function init() {

    const $listView = $(".cardview-completion")

    $listView.on("mouseenter", "img", function() {
        $(this).attr("src", "images/red-dot-light-interior.svg")
    })

    $listView.on("mouseleave", "img", function() {
        const element = $(this)
        if (element.parent("button").attr("data-value") === getValue())
            element.attr("src", "images/red-dot.svg")
        else
            element.attr("src", "images/red-dot-empty.svg")
    })

    $listView.on("click", "button", function() {
        const value = $(this).attr("data-value")
        // @ts-ignore
        setValue(value)
    })

}

function refresh() {
    const $view = $(".cardview-completion")

    if (!getCurrentCard()) {
        $view.hide()
        return
    }


    $view
        .show()
        .find("img")
        .each((i, element) => {

            const $element = $(element)
            if ($element.parent("button").attr("data-value") === getValue())
                $element.attr("src", "images/red-dot.svg")
            else
                $element.attr("src", "images/red-dot-empty.svg")

        })
}

function setValue(value:"correct"|"incorrect"|"untried") {
    const card = getCurrentCard()
    undoRedo.editProperty(card, "completion", value, refresh)
}

function getValue() {
    return getCurrentCard().completion || "untried"
}
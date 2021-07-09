import * as undoRedo from "../undo-redo";
import {getCurrentCard} from "../card-view";

export {
    init,
    refresh,
    setValue
}

function init() {

    const $listView = $(".cardview-difficulty-list")

    $listView.on("mouseenter", "img", function() {
        $(this).attr("src", "images/star-filled-light.svg")
    })

    $listView.on("mouseleave", "img", function() {
        const $img = $(this)
        // @ts-ignore
        if ($img.parent("button").attr("data-n") <= getValue())
            $img.attr("src", "images/star-filled.svg")
        else
            $img.attr("src", "images/star-empty.svg")
    })

    $listView.on("click", "button", function() {
        const value = $(this).attr("data-n")
        // @ts-ignore
        setValue(value)
    })

}

function refresh() {

    const $view = $(".cardview-difficulty")
    if (!getCurrentCard()) {
        $view.hide()
        return
    }
    else $view.show()

    $(".cardview-difficulty-list")
        .find("img")
        .each((i, element) => {

            const $element = $(element)

            // @ts-ignore
            if ($element.parent("button").attr("data-n") <= getValue())
                $element.attr("src", "images/star-filled.svg")
            else
                $element.attr("src", "images/star-empty.svg")

        })
}

function setValue(number:number) {
    number = Math.max(1, Math.min(number, 5))
    const card = getCurrentCard()
    undoRedo.editProperty(card, "difficulty", number, refresh)
}

function getValue() {
    return getCurrentCard().difficulty || 1
}

import * as options from "./options"

export {
    toggle,
    hide,
    isVisible
}

let visible = false

function toggle() {

    if (isVisible())
        hide()

    else show()

}

function isVisible() {
    return visible
}

function show() {

    visible = true

    $(".cardview-show-answer").hide("fast")
    $(".cardview-answer").show("fast")

    options.showAnswer()

}

function hide() {

    visible = false

    options.hideAnswer()

    $(".cardview-answer").hide("fast")
    $(".cardview-show-answer").show("fast")

}

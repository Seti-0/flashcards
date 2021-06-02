import * as cardview from "./card-view"

export function hideIfEmpty($element) {

    if ($element.text() === "" && !cardview.cardview_isEditing())
        $element.hide()
    else
        $element.show()

}

export function mapColor(cssRgbString, f) {

    const pattern = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/
    const result = cssRgbString.match(pattern)

    const r = parseInt(result[1])
    const g = parseInt(result[2])
    const b = parseInt(result[3])

    let [r2, g2, b2] = f(r, g, b)

    r2 = Math.max(0, Math.min(Math.floor(r2), 255))
    g2 = Math.max(0, Math.min(Math.floor(g2), 255))
    b2 = Math.max(0, Math.min(Math.floor(b2), 255))

    return `rgb(${r2}, ${g2}, ${b2})`

}

export function moveCursorToEnd() {
    document.execCommand('selectAll', false, null);
    document.getSelection().collapseToEnd();
}

export function cleanContent(html) {
    return html
        .replace("<div><br></div>>", "<br>")
        .replaceAll("<div>", "<br>").replaceAll("</div>", "")
}
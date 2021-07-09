import * as cardview from "./card-view"

export {
    hideIfEmpty,
    mapColor,
    cleanContent,
    moveCursorToEnd
}

function hideIfEmpty($element:any) {

    if ($element.text() === "" && !cardview.isEditing())
        $element.hide()
    else
        $element.show()

}

function mapColor(cssRgbString:string,
                         f:(r:number, g:number, b:number)
                             => [number, number, number]) {

    const pattern = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/
    const result = cssRgbString.match(pattern)

    if (!result) {
        console.log("Failed to match: " + result)
        return cssRgbString
    }

    const r = parseInt(result[1])
    const g = parseInt(result[2])
    const b = parseInt(result[3])

    let [r2, g2, b2] = f(r, g, b)

    r2 = Math.max(0, Math.min(Math.floor(r2), 255))
    g2 = Math.max(0, Math.min(Math.floor(g2), 255))
    b2 = Math.max(0, Math.min(Math.floor(b2), 255))

    return `rgb(${r2}, ${g2}, ${b2})`

}

function moveCursorToEnd() {
    document.execCommand('selectAll', false);
    document.getSelection()?.collapseToEnd();
}

function cleanContent(html:string) {
    return html
        .replace("<div><br></div>>", "<br>")
        .replaceAll("<div>", "<br>").replaceAll("</div>", "")
}
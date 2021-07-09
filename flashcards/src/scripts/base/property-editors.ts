import * as utility from "../utility"
import * as undoRedo from "../undo-redo"
import {View} from "./view"

export {
    Editor,
    TextEditor,
    ValueEditor
}

abstract class Editor<T> implements View {

    readonly elementSelector
    readonly targetSelector
    readonly property
    readonly callback

    value:T

    protected constructor(elementSelector:string,
                targetSelector:any, property:string,
                callback:()=>void, comboKey:string|undefined) {

        this.elementSelector = elementSelector
        this.targetSelector = targetSelector
        this.property = property
        this.callback = callback

        this.value = targetSelector()[property]
        this.updateView()

        const $element = $(elementSelector)
        $element.on("input", () => {
            const value = this.getViewValue()
            const target = targetSelector()
            undoRedo.editProperty(target, property, value, this.updateView, true)
        })

    }

    updateView() {
        const value = this.targetSelector()[this.property]
        if (this.getViewValue() !== value)
            this.setViewValue(value)
    }

    abstract getViewValue(): T

    abstract setViewValue(value: T): void

}

class TextEditor extends Editor<string> {

    getViewValue() {
        return utility.cleanContent($(this.elementSelector).html())
    }

    setViewValue(value: string) {
        $(this.elementSelector).html(value)
    }

}

class ValueEditor extends Editor<string> {

    getViewValue() {
        const value = $(this.elementSelector).val()
        if (value)
            return value.toString()
        else {
            console.error(`ValueEditor: "${this.elementSelector}" value was undefined`)
            return ""
        }
    }

    setViewValue(value: string) {
        return $(this.elementSelector).val(value)
    }

}
import * as undoRedo from "../undo-redo"
import * as utility from "../utility"
import * as cardview from "../card-view"
import {View} from "./view"

export {
    ListView
}

abstract class ListView<T> implements View {

    readonly elementSelector
    readonly getter
    readonly callback

    protected constructor(elementSelector: string,
                          getter: () => T[], callback: () => void) {

        this.elementSelector = elementSelector
        this.getter = getter
        this.callback = callback

        this.updateView()

    }

    updateView() {

        const speed = "fast"

        const value = this.getter()
        const view = $(this.elementSelector)

        const current_n = view.children().length
        const target_n = value.length

        if (current_n < target_n) {

            // Add any missing items

            for (let i = current_n; i < value.length; i++) {

                const li = this.createElement(value[i], i)
                view.append(li)
                li.hide()
                li.show(speed)

            }

        } else if (current_n > target_n) {

            // Remove any extra items

            for (let i = 0; i < current_n - target_n; i++) {
                const $toRemove = view.children().last()
                $toRemove.hide(speed, function () {
                    $toRemove.remove()
                })
            }

        }

        view.children().each((index, element) => {
            this.updateElement(element, value[index], index)
        })

        utility.hideIfEmpty(view)

    }

    abstract createElement(value: T, index: number): JQuery;

    abstract updateElement(element:HTMLElement, value:T, index:number): void;

    deleteItem(index:number) {
        const list = this.getter()
        undoRedo.deleteListItem(list, index, this.updateView)
    }

    addItem(value:T) {
        const list = this.getter()
        undoRedo.pushListItem(list, value, this.updateView)
    }

}

import * as keyboard from "./keyboard"
import * as cardview from "./card-view"
import * as cards from "./cards"
import {sourceCards} from "./data";

export {
    undoRedo_init,
    undoRedo_editProperty,
    undoRedo_pushListItem,
    undoRedo_deleteListItem,
    undoRedo_deleteCard,
    undoRedo_createNewLabel,
    undoRedo_deleteLabel
}

/*

    MECHANISM

 */

const undoRedo_past:any[] = []
const undoRedo_future:any[] = []

const undoRedo_exampleAction = {
    "do": () => console.log("Do"),
    "undo": () => console.log("Undo"),
    "continueGroup": "undoRedo_example",
    "tryContinue": (next:any) => {
        console.log("Continue with: " + next)
        return true
    }
}

function undoRedo_init() {

    keyboard.keyboard_addShortcut({
        "key": "z",
        "modifiers": "ctrl",
        "action": undoRedo_undo,
        "allowWhileEditingInput": true
    })

    keyboard.keyboard_addShortcut({
        "key": "y",
        "modifiers": "ctrl",
        "action": undoRedo_redo,
        "allowWhileEditingInput": true
    })

    keyboard.keyboard_addShortcut({
        "key": "z",
        "modifiers": ["ctrl", "shift"],
        "action": undoRedo_redo,
        "allowWhileEditingInput": true
    })

}

function undoRedo_do(action:any) {

    action.name ||= "(No Name)"
    action.tryContinue ||= () => false

    action.do()

    let continued = false
    if (undoRedo_past.length > 0) {
        const previous = undoRedo_past[undoRedo_past.length - 1]
        if (previous.continueGroup === action.continueGroup)
            continued = previous.tryContinue(action)
    }

    if (!continued)
        undoRedo_past.push(action)

    undoRedo_future.length = 0

}

function undoRedo_undo() {

    if (undoRedo_past.length === 0)
        return

    const action = undoRedo_past.pop()
    action.undo()

    undoRedo_future.push(action)

}

function undoRedo_redo() {

    if (undoRedo_future.length === 0)
        return

    const action = undoRedo_future.pop()
    action.do()

    undoRedo_past.push(action)

}

/*

    ACTIONS

 */

function undoRedo_editProperty(target:any, propertyName:string|number,
                               newValue:any, callback:Function, combine=false) {

    const oldValue = target[propertyName]

    undoRedo_do({
        "do": function() {
            target[propertyName] = newValue
            if (callback) callback()
        },
        "undo": function() {
            target[propertyName] = oldValue
            if(callback) callback()
        },
        // Chain subsequent edits of the same property on the
        // same target.
        "continueGroup": "undoRedo_editProperty",
        "target": target,
        "propertyName": propertyName,
        "newValue": newValue,
        "callback": callback,
        "tryContinue": (next:any) => {
            if (!combine) return false
            if (target !== next.target || propertyName !== next.propertyName)
                return false
            newValue = next.newValue
            callback = next.callback
            return true
        }
    })

}

function undoRedo_deleteListItem(target:any, index:number, callback:Function) {

    const value = target[index]

    undoRedo_do({
        "do": function() {
            target.splice(index, 1)
            if (callback) callback()
        },
        "undo": function() {
            target.splice(index, 0, value)
            if (callback) callback()
        }
    })

}

function undoRedo_pushListItem(target:any, value:any, callback:Function) {

    undoRedo_do({
        "do": function() {
            target.push(value)
            if(callback) callback()
        },
        "undo": function() {
            target.pop(value)
            if(callback) callback()
        }
    })

}

function undoRedo_deleteCard(cardID:number) {

    const page = cardview.cardview_pageOf(cardID)
    const card = cards.cards_get(cardID)

    undoRedo_do({
        "do": () => {
            if (page !== -1) cardview.cardview_removeCard(page)
            cards.cards_delete(cardID)
        },
        "undo": () => {
            cards.cards_add(card)
            if (page !== -1) cardview.cardview_addCardID(cardID)
        }
    })

}

function undoRedo_createNewLabel(callback:Function) {

    let label:any

    undoRedo_do({
        "do": function() {
            label = cards.cards_createNewLabel()
            if (callback) callback()
        },
        "undo": function() {
            cards.cards_deleteLabel(label)
            if (callback) callback()
        }
    })

}

function undoRedo_deleteLabel(labelID:number, callback:Function) {

    const labelledCards = sourceCards.filter(x => x.labels.includes(labelID))
    const label = cards.cards_getLabel(labelID)

    undoRedo_do({
        "do": function() {
            cards.cards_deleteLabel(label)
            if (callback) callback()
        },
        "undo": function() {
            cards.cards_addLabel(label)
            labelledCards.forEach(x => x.labels.push(labelID))
            if (callback) callback()
        }
    })

}

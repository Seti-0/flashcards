import * as keyboard from "./keyboard"
import * as cardview from "./card-view"
import * as cards from "./cards"
import {sourceCards} from "./data";

export {
    undoRedo_init,
    editProperty,
    pushListItem,
    deleteListItem,
    deleteCard,
    createNewLabel,
    deleteLabel,
    edit
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

    keyboard.addShortcut({
        "key": "z",
        "modifiers": "ctrl",
        "action": undoRedo_undo,
        "allowWhileEditingInput": true
    })

    keyboard.addShortcut({
        "key": "y",
        "modifiers": "ctrl",
        "action": undoRedo_redo,
        "allowWhileEditingInput": true
    })

    keyboard.addShortcut({
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

function edit<T>(getter:()=>T, setter:(value:T)=>void,
              value:T, callback:undefined|(()=>void),
                 key:any) {

    const oldValue = getter()

    const action:any = {
        "do": function() {
            setter(value)
            if (callback) callback()
        },
        "undo": function() {
            setter(oldValue)
            if (callback) callback()
        }
    }

    if (key) {
        action["continueGroup"] = "undoRedo_edit"
        action["value"] = value
        action["key"] = key
        action["callback"] = callback
        action["tryContinue"] = function(next:any) {
            if (key !== next.key)
                return false
            value = next.value
            callback = next.callback
            return true
        }
    }

    undoRedo_do(action)

}

function editProperty(target:any, propertyName:string|number,
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

function deleteListItem(target:any, index:number, callback:Function) {

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

function pushListItem(target:any, value:any, callback:Function) {

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

function deleteCard(cardID:number) {

    const page = cardview.pageOf(cardID)
    const card = cards.get(cardID)

    undoRedo_do({
        "do": () => {
            if (page !== -1) cardview.removeCard(page)
            cards.remove(cardID)
        },
        "undo": () => {
            cards.add(card)
            if (page !== -1) cardview.addCardID(cardID)
        }
    })

}

function createNewLabel(callback:Function) {

    let label:any

    undoRedo_do({
        "do": function() {
            label = cards.createNewLabel()
            if (callback) callback()
        },
        "undo": function() {
            cards.removeLabel(label)
            if (callback) callback()
        }
    })

}

function deleteLabel(labelID:number, callback:Function) {

    const labelledCards = sourceCards.filter(x => x.labels.includes(labelID))
    const label = cards.getLabel(labelID)

    undoRedo_do({
        "do": function() {
            cards.removeLabel(label)
            if (callback) callback()
        },
        "undo": function() {
            cards.addLabel(label)
            labelledCards.forEach(x => x.labels.push(labelID))
            if (callback) callback()
        }
    })

}

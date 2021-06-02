import {sourceCards, sourceLabels} from "./data";
import * as cardview from "./card-view"

const cards_map = new Map()
const labels_map = new Map()

let cards_nextID = 1
let cards_nextLabelID = 1

export {
    cards_init,
    cards_get,
    cards_getIDs,
    cards_exists,
    cards_add,
    cards_delete,
    cards_getLabel,
    cards_getLabels,
    cards_createNewLabel,
    cards_addLabel,
    cards_deleteLabel
}

function cards_init() {

    cards_map.clear()
    for (let card of sourceCards)
        cards_map.set(card.id, card)
    cards_nextID = sourceCards.length + 1

    labels_map.clear()
    for (let label of sourceLabels)
        labels_map.set(label.id, label)
    cards_nextLabelID = sourceLabels.length + 1

}

function cards_createNew() {

    const newCard = { "id": cards_nextID }
    cards_nextID++

    cards_add(newCard)
    return newCard

}

function cards_add(card: any) {
    cards_map.set(card.id, card)
    cardview.cardview_onCardsChanged()
}

function cards_get(cardID: number) {
    return cards_map.get(cardID)
}

function cards_getAll() {
    return cards_map.values()
}

function cards_exists(cardID: number) {
    return cards_map.has(cardID)
}

function cards_delete(cardID: number) {
    cards_map.delete(cardID)
    cardview.cardview_onCardsChanged()
}

function cards_getIDs() {
    return cards_map.keys()
}

function cards_createNewLabel() {

    const newLabel = { "id": cards_nextLabelID }
    cards_nextLabelID++

    cards_addLabel(newLabel)
    return newLabel

}

function cards_addLabel(label: any) {
    labels_map.set(label.id, label)
}

function cards_getLabel(labelID: number) {
    return labels_map.get(labelID)
}

function cards_getLabels() {
    return [...labels_map.values()]
}

function cards_deleteLabel(label: any) {
    [...cards_getAll()].forEach((item) => {
        const labels = item.labels
        const index = labels.indexOf(label.id)
        if (index >= 0)
            item.labels.splice(index, 1)
    })
    labels_map.delete(label.id)
}

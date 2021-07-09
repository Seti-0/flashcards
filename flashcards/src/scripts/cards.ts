import {sourceCards, sourceLabels} from "./data";
import * as cardview from "./card-view"

class Label {

    id; name; color; textColor;

    constructor(id:number,
                name:string|undefined,
                color:string|undefined,
                textColor:string|undefined) {

        this.id = id; this.name = name
        this.color = color; this.textColor = textColor

    }

}

class Card {

    id; content; labels; options; correct;
    completion; difficulty; answerContent;

    constructor(id:number,
                content:string|undefined,
                labels:number[],
                options:string[],
                correct:number|undefined,
                completion:string|undefined,
                difficulty:number|undefined,
                answerContent:string|undefined) {

        this.id = id; this.content = content; this.labels = labels;
        this.options = options; this.correct = correct;
        this.completion = completion; this.difficulty = difficulty;
        this.answerContent = answerContent

    }

}

const cards_map = new Map<number, Card>()
const labels_map = new Map<number, Label>()

let nextCardID = 1
let nextLabelID = 1

export {
    Card,
    Label,
    init,
    get,
    getIDs,
    exists,
    add,
    remove,
    getLabel,
    getLabels,
    createNewLabel,
    addLabel,
    removeLabel
}

function init() {

    cards_map.clear()
    for (let card of sourceCards)
        cards_map.set(card.id, new Card(
            card.id,
            card.content,
            card.labels,
            card.options,
            card.correct,
            card.completion,
            card.difficulty,
            card.answerContent
            )
        )
    nextCardID = sourceCards.length + 1

    labels_map.clear()
    for (let label of sourceLabels)
        labels_map.set(label.id, new Label(
            label.id,
            label.name,
            label.color,
            label.textColor
        ))
    nextLabelID = sourceLabels.length + 1

}

function createNew() {

    const newCard = { "id": nextCardID }
    nextCardID++

    add(newCard)
    return newCard

}

function add(card: any) {
    cards_map.set(card.id, card)
    cardview.onCardsChanged()
}

function get(cardID: number) {
    return cards_map.get(cardID)
}

function cards_getAll() {
    return cards_map.values()
}

function exists(cardID: number) {
    return cards_map.has(cardID)
}

function remove(cardID: number) {
    cards_map.delete(cardID)
    cardview.onCardsChanged()
}

function getIDs() {
    return cards_map.keys()
}

function createNewLabel() {

    const newLabel = { "id": nextLabelID }
    nextLabelID++

    addLabel(newLabel)
    return newLabel

}

function addLabel(label: any) {
    labels_map.set(label.id, label)
}

function getLabel(labelID: number) {
    return labels_map.get(labelID)
}

function getLabels() {
    return [...labels_map.values()]
}

function removeLabel(label: any) {
    [...cards_getAll()].forEach((item) => {
        const labels = item.labels
        const index = labels.indexOf(label.id)
        if (index >= 0)
            item.labels.splice(index, 1)
    })
    labels_map.delete(label.id)
}

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

    id; title; imgName; content; labels; options; correct;
    completion; difficulty; answerContent;

    constructor(id:number,
                title:string|undefined,
                imgName:string|undefined,
                content:string|undefined,
                labels:number[],
                options:string[],
                correct:number|undefined,
                completion:string|undefined,
                difficulty:number|undefined,
                answerContent:string|undefined) {

        this.id = id; this.title=title; this.imgName=imgName; 
        this.content = content; this.labels = labels;
        this.options = options; this.correct = correct;
        this.completion = completion; this.difficulty = difficulty;
        this.answerContent = answerContent

    }

}

const cardsMap = new Map<number, Card>()
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

    cardsMap.clear()
    for (let card of sourceCards)
        cardsMap.set(card.id, new Card(
            card.id,
            undefined,
            card.img_name,
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
    cardsMap.set(card.id, card)
    cardview.onCardsChanged()
}

function get(cardID: number) {
    return cardsMap.get(cardID)
}

function cards_getAll() {
    return cardsMap.values()
}

function exists(cardID: number) {
    return cardsMap.has(cardID)
}

function remove(cardID: number) {
    cardsMap.delete(cardID)
    cardview.onCardsChanged()
}

function getIDs() {
    return cardsMap.keys()
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

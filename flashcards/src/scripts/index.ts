import * as cardview from "./card-view"
import * as cards from "./cards"
import * as keyboard from "./keyboard"
import * as undoRedo from "./undo-redo"

$(function(){

    console.log("Starting... " + new Date().toLocaleTimeString());

    cards.cards_init()
    keyboard.keyboard_init()
    undoRedo.undoRedo_init()

    $(".included-content").load("card-view.html", function() {
        cardview.cardview_Init()
        cardview.cardview_setCardIDs([...cards.cards_getIDs()])
        cardview.cardview_setPage(150)
    })

})

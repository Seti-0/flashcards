import * as cardview from "./card-view"
import * as cards from "./cards"
import * as keyboard from "./keyboard"
import * as undoRedo from "./undo-redo"

$(function(){

    console.log("Starting... " + new Date().toLocaleTimeString());

    cards.init()
    keyboard.init()
    undoRedo.undoRedo_init()

    $(".included-content").load("card-view.html", function() {
        cardview.init()
        cardview.setCardIDs([...cards.getIDs()])
        cardview.setPage(150)
    })

})

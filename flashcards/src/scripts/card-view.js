///<reference path="cards.js"/>
///<reference path="data.js"/>
///<reference path="home.js"/>
///<reference path="index.js"/>
///<reference path="keyboard.js"/>
///<reference path="undo-redo.js"/>
///<reference path="utility.js"/>
var cardview_index = [];
var cardview_page = 1;
var cardview_editing = false;
function cardview_onCardsChanged() {
    cardview_setCardIDs(cardview_index.filter(cards_exists));
}
function cardview_setCardIDs(index) {
    cardview_index = index;
    cardview_onCardIDsChanged();
}
function cardview_onCardIDsChanged() {
    $(".cardview-total-pages").text(cardview_index.length);
    cardview_checkPage();
    cardview_refreshPage();
}
function cardview_addCardID(cardID, page) {
    page || (page = cardview_page);
    cardview_index.splice(page - 1, 0, cardID);
    cardview_onCardIDsChanged();
}
function cardview_removeCard(page) {
    page || (page = cardview_page);
    cardview_index.splice(page - 1, 1);
    cardview_onCardIDsChanged();
}
function cardview_pageOf(cardID) {
    return cardview_index.indexOf(cardID) + 1;
}
function cardview_getCurrentCardID() {
    if (cardview_index.length === 0)
        return undefined;
    return cardview_index[cardview_getPage() - 1];
}
function cardview_getCurrentCard() {
    if (cardview_index.length === 0)
        return undefined;
    return cards_get(cardview_getCurrentCardID());
}
function cardview_getPageCount() {
    return cardview_index.length;
}
function cardview_getPage() {
    return cardview_page;
}
function cardview_checkPage() {
    cardview_setPage(cardview_page);
}
function cardview_setPage(newValue) {
    newValue = Math.max(1, Math.min(newValue, cardview_getPageCount()));
    if (cardview_getPageCount() === 0)
        newValue = 0;
    var $view = $(".cardview-current-page");
    if (newValue.toString() !== $view.html())
        $view.html(newValue.toString());
    if (newValue !== cardview_page) {
        cardview_page = newValue;
        cardview_refreshPage();
    }
}
function cardview_Init() {
    $(".cardview-labels-add-list").hide();
    $(".cardview-title").on("input", function () {
        var $input = $(this);
        var card = cardview_getCurrentCard();
        var value = utility_cleanContent($input.html());
        undoRedo_editProperty(card, "title", value, function () {
            if ($input.html() !== card.title)
                $input.html(card.title);
        }, true);
    });
    $(".cardview-details").on("input", function () {
        var $input = $(this);
        var card = cardview_getCurrentCard();
        var value = utility_cleanContent($input.html());
        undoRedo_editProperty(card, "content", value, function () {
            if ($input.html() !== card.content)
                $input.html(card.content);
        }, true);
    });
    $(".cardview-show-answer").on("click", cardviewAnswer_toggle);
    $(".cardview-hide-answer").on("click", cardviewAnswer_toggle);
    $(".cardview-answer-text").on("input", function () {
        var $input = $(this);
        var card = cardview_getCurrentCard();
        var value = utility_cleanContent($input.html());
        undoRedo_editProperty(card, "answerContent", value, function () {
            if ($input.html() !== card.answerContent)
                $input.html(card.answerContent);
        }, true);
    });
    $(".cardview-nav-left").on("click", cardview_previousPage);
    $(".cardview-nav-right").on("click", cardview_nextPage);
    $(".cardview-current-page").on("input", function () {
        var userInput = $(this).html();
        var userPage = parseInt(userInput) || 1;
        var page = Math.max(1, Math.min(userPage, cardview_getPageCount()));
        cardview_setPage(page);
        if (page.toString() !== userInput)
            utility_moveCursorToEnd();
        cardview_refreshPage();
    });
    $(".cardview-config-toggle").on("click", cardview_toggleConfig);
    $(".cardview-delete").on("click", function () {
        var cardID = cardview_getCurrentCardID();
        if (cardID)
            undoRedo_deleteCard(cardID);
    });
    $(".cardview-edit").on("click", cardview_toggleEditing);
    cardviewOptions_init();
    cardviewCompletion_init();
    cardviewDifficulty_init();
    cardviewLabels_init();
    cardview_initShortcuts();
    cardview_setCardIDs([]);
}
function cardview_initShortcuts() {
    function register(key, action) {
        keyboard_addShortcut({
            "key": key,
            "action": action
        });
    }
    register(["ArrowLeft", "a"], cardview_previousPage);
    register(["ArrowRight", "d"], cardview_nextPage);
    register(" ", cardviewAnswer_toggle);
    register("q", cardview_toggleConfig);
    register("e", cardview_toggleEditing);
    var _loop_1 = function (i) {
        register(i.toString(), function () {
            if (cardviewAnswer_isVisible()) {
                if (i < 6)
                    cardviewDifficulty_setValue(i);
                else {
                    var value = void 0;
                    if (i === 6)
                        value = "untried";
                    else if (i === 7)
                        value = "incorrect";
                    else
                        value = "correct";
                    cardviewCompletion_setValue(value);
                }
            }
            else {
                cardviewOptions_selectNumber(i);
                cardviewOptions_showAnswer();
            }
        });
    };
    for (var i = 1; i < 10; i++) {
        _loop_1(i);
    }
}
function cardview_nextPage() {
    var page = cardview_getPage();
    page++;
    if (page > cardview_getPageCount())
        page = 1;
    cardviewLabels_hideAddList();
    if (!cardview_isEditing())
        cardviewAnswer_hide();
    cardview_setPage(page);
}
function cardview_previousPage() {
    var page = cardview_getPage();
    page--;
    if (page < 1)
        page = cardview_getPageCount();
    cardviewLabels_hideAddList();
    if (!cardview_isEditing())
        cardviewAnswer_hide();
    cardview_setPage(page);
}
function cardview_refreshPage() {
    var $titleView = $(".cardview-title");
    var $contentView = $(".cardview-details");
    var $imgView = $(".cardview-image");
    var $answerView = $(".cardview-answer-text");
    var $emptyMsgs = $(".cardview-empty-message, .cardview-config-empty-message");
    var card = cardview_getCurrentCard();
    if (!card) {
        $emptyMsgs.show();
        $titleView.hide();
        $contentView.hide();
        $imgView.hide();
        $answerView.hide();
    }
    else {
        $emptyMsgs.hide();
        var title = card.title || "";
        $titleView.html(title);
        utility_hideIfEmpty($titleView);
        var content = card.content || "";
        $contentView.html(content);
        utility_hideIfEmpty($contentView);
        var imgName = card.img_name;
        if (imgName) {
            var imgSrc = "data/images/" + imgName;
            $imgView.attr("src", imgSrc);
            $imgView.show("fast");
        }
        else {
            $imgView.hide("fast");
        }
        var answerContent = card.answerContent || "(No content)";
        $answerView.html(answerContent);
        utility_hideIfEmpty($answerView);
    }
    cardviewOptions_refresh();
    cardviewCompletion_refresh();
    cardviewDifficulty_refresh();
    cardviewLabels_refresh();
}
function cardview_toggleEditing() {
    if (cardview_isEditing())
        cardview_stopEditing();
    else if (cardview_getCurrentCard())
        cardview_startEditing();
}
function cardview_isEditing() {
    return cardview_editing;
}
function cardview_startEditing() {
    cardview_editing = true;
    $(".cardview-edit").css("background-color", "#eee");
    $(".cardview-title").prop("contenteditable", true);
    $(".cardview-details").prop("contenteditable", true);
    cardviewOptions_startEditing();
    $(".cardview-show-answer").hide("fast");
    $(".cardview-hide-answer").hide("fast");
    $(".cardview-answer").show("fast");
    $(".cardview-answer-text").prop("contenteditable", true);
    cardview_refreshPage();
}
function cardview_stopEditing() {
    cardview_editing = false;
    $(".cardview-edit").css("background-color", "#00000000");
    $(".cardview-title").prop("contenteditable", false);
    $(".cardview-details").prop("contenteditable", false);
    cardviewOptions_stopEditing();
    $(".cardview-show-answer").show("fast");
    $(".cardview-hide-answer").show("fast");
    $(".cardview-answer").hide("fast");
    $(".cardview-answer-text").prop("contenteditable", false);
    cardview_refreshPage();
}
function cardview_toggleConfig() {
    $(".cardview-config").toggle("fast");
}
/*

    CARDVIEW - ANSWER

 */
var cardviewAnswer_visible = false;
function cardviewAnswer_toggle() {
    if (cardviewAnswer_isVisible())
        cardviewAnswer_hide();
    else
        cardviewAnswer_show();
}
function cardviewAnswer_isVisible() {
    return cardviewAnswer_visible;
}
function cardviewAnswer_show() {
    cardviewAnswer_visible = true;
    $(".cardview-show-answer").hide("fast");
    $(".cardview-answer").show("fast");
    cardviewOptions_showAnswer();
}
function cardviewAnswer_hide() {
    cardviewAnswer_visible = false;
    cardviewOptions_hideAnswer();
    $(".cardview-answer").hide("fast");
    $(".cardview-show-answer").show("fast");
}
/*

    CARDVIEW - OPTIONS

*/
function cardviewOptions_init() {
    var optionsView = $(".cardview-options");
    var listView = $(".cardview-options-list");
    listView.on("click", ".cardview-option", function () {
        if (!cardview_isEditing())
            cardviewOptions_select(this);
    });
    listView.on("mouseenter", ".cardview-option-correctness img", function () {
        $(this).attr("src", "images/red-dot-light.svg");
    });
    listView.on("mouseleave", ".cardview-option-correctness img", function () {
        $(this).attr("src", "images/red-dot.svg");
    });
    listView.on("click", ".cardview-option-correctness", function () {
        var $option = $(this).parent(".cardview-option");
        var index = parseInt($option.attr("data-index"));
        var card = cardview_getCurrentCard();
        undoRedo_editProperty(card, "correct", index + 1, cardviewOptions_refresh);
    });
    listView.on("input", ".cardview-option-content", function () {
        var $content = $(this);
        var $option = $content.parent(".cardview-option");
        var content = utility_cleanContent($content.html());
        var index = parseInt($option.attr("data-index"));
        var options = cardview_getCurrentCard().options;
        options[index] = content;
        undoRedo_editProperty(options, index, content, cardviewOptions_refresh, true);
    });
    listView.on("click", ".cardview-option-delete", function () {
        var $option = $(this).parent(".cardview-option");
        var index = parseInt($option.attr("data-index"));
        var card = cardview_getCurrentCard();
        undoRedo_deleteListItem(card.options, index, cardviewOptions_refresh);
    });
    optionsView.on("click", ".cardview-options-new", function () {
        var card = cardview_getCurrentCard();
        var value = "Option #" + (card.options.length + 1);
        undoRedo_pushListItem(card.options, value, cardviewOptions_refresh);
    });
}
function cardviewOptions_refresh(speed) {
    if (speed === void 0) { speed = "fast"; }
    var card = cardview_getCurrentCard();
    if (card)
        $(".cardview-options").show();
    else {
        $(".cardview-options").hide();
        return;
    }
    var options = card.options || [];
    var correct = card.correct || 0;
    var $listView = $(".cardview-options-list");
    var current_n = $listView.children().length;
    var target_n = options.length;
    if (current_n < target_n) {
        // Add any missing items
        for (var i = current_n; i < options.length; i++) {
            var $li = $("\n            <li class=\"cardview-option\" data-index=\"" + i + "\">\n                <button class=\"cardview-option-correctness\">\n                    <img alt=\"incorrect\" src=\"images/red-dot.svg\">\n                </button>\n                <span class=\"cardview-option-number\">" + (i + 1) + ")</span>\n                <span class=\"cardview-option-content\" data-placeholder=\"(Option Content)\"></span>\n                <button class=\"cardview-option-delete\">\n                    <img alt=\"delete\" src=\"images/delete.svg\">\n                </button>\n            </li>\n        ");
            $listView.append($li);
            $li.hide();
            // @ts-ignore
            $li.show(speed);
        }
    }
    else if (current_n > target_n) {
        var _loop_2 = function (i) {
            var $toRemove = $listView.children().last();
            $toRemove.hide(speed, function () {
                $toRemove.remove();
            });
        };
        // Remove any extra items
        for (var i = 0; i < current_n - target_n; i++) {
            _loop_2(i);
        }
    }
    // Update existing items
    $listView.children().each(function (i) {
        var $li = $(this);
        var $content = $li.find(".cardview-option-content");
        if ($content.html() !== options[i])
            $content.html(options[i]);
        var $correctnessImg = $li.find(".cardview-option-correctness");
        if (correct === i + 1) {
            $li.addClass("cardview-correct-secret");
            $correctnessImg.removeClass("icon-incorrect");
            $correctnessImg.addClass("icon-correct");
        }
        else {
            $li.removeClass("cardview-correct-secret");
            $correctnessImg.removeClass("icon-correct");
            $correctnessImg.addClass("icon-incorrect");
        }
        if (cardview_isEditing()) {
            $li.find(".cardview-option-content").attr("contenteditable", "true");
            $li.find(".cardview-option-correctness").show(speed);
            $li.find(".cardview-option-delete").show(speed);
        }
        else {
            $li.find(".cardview-option-content").attr("contenteditable", "false");
            $li.find(".cardview-option-correctness").hide(speed);
            $li.find(".cardview-option-delete").hide(speed);
        }
    });
    utility_hideIfEmpty($listView);
}
function cardviewOptions_select(element) {
    $(".cardview-selected").removeClass("cardview-selected");
    $(element).addClass("cardview-selected");
}
function cardviewOptions_selectNumber(number) {
    var options = document
        .querySelector(".cardview-options-list")
        .children;
    if (options.length === 0)
        return;
    number = Math.max(1, Math.min(number, options.length));
    cardviewOptions_select(options[number - 1]);
}
function cardviewOptions_showAnswer() {
    var $correct = $(".cardview-correct-secret");
    var $selected = $(".cardview-selected");
    var card = cardview_getCurrentCard();
    if ($correct.is($selected))
        card.completion = "correct";
    else
        card.completion = "incorrect";
    cardviewCompletion_refresh();
    $(".cardview-correct").removeClass("cardview-correct");
    $(".cardview-incorrect").removeClass("cardview-incorrect");
    $correct.addClass("cardview-correct");
    $selected.addClass("cardview-incorrect");
    $selected.removeClass("cardview-selected");
}
function cardviewOptions_hideAnswer() {
    $(".cardview-incorrect").removeClass("cardview-incorrect");
    $(".cardview-correct-secret").removeClass("cardview-correct");
}
function cardviewOptions_startEditing() {
    cardviewOptions_hideAnswer();
    $(".cardview-selected").removeClass("cardview-selected");
    $(".cardview-options-new").show("fast");
    cardviewOptions_refresh();
}
function cardviewOptions_stopEditing() {
    $(".cardview-options-new").hide("fast");
    cardviewOptions_refresh();
}
/*

    CARDVIEW - COMPLETION

*/
function cardviewCompletion_init() {
    var $listView = $(".cardview-completion");
    $listView.on("mouseenter", "img", function () {
        $(this).attr("src", "images/red-dot-light-interior.svg");
    });
    $listView.on("mouseleave", "img", function () {
        var element = $(this);
        if (element.parent("button").attr("data-value") === cardviewCompletion_getValue())
            element.attr("src", "images/red-dot.svg");
        else
            element.attr("src", "images/red-dot-empty.svg");
    });
    $listView.on("click", "button", function () {
        var value = $(this).attr("data-value");
        cardviewCompletion_setValue(value);
    });
}
function cardviewCompletion_refresh() {
    var $view = $(".cardview-completion");
    if (!cardview_getCurrentCard()) {
        $view.hide();
        return;
    }
    $view
        .show()
        .find("img")
        .each(function (i, element) {
        var $element = $(element);
        if ($element.parent("button").attr("data-value") === cardviewCompletion_getValue())
            $element.attr("src", "images/red-dot.svg");
        else
            $element.attr("src", "images/red-dot-empty.svg");
    });
}
function cardviewCompletion_setValue(value) {
    if (value !== "correct" && value !== "incorrect" && value !== "untried") {
        console.error("Invalid value for completion");
        return;
    }
    var card = cardview_getCurrentCard();
    undoRedo_editProperty(card, "completion", value, cardviewCompletion_refresh);
}
function cardviewCompletion_getValue() {
    return cardview_getCurrentCard().completion || "untried";
}
/*

    CARDVIEW - DIFFICULTY

*/
function cardviewDifficulty_init() {
    var $listView = $(".cardview-difficulty-list");
    $listView.on("mouseenter", "img", function () {
        $(this).attr("src", "images/star-filled-light.svg");
    });
    $listView.on("mouseleave", "img", function () {
        var $img = $(this);
        if ($img.parent("button").attr("data-n") <= cardviewDifficulty_getValue())
            $img.attr("src", "images/star-filled.svg");
        else
            $img.attr("src", "images/star-empty.svg");
    });
    $listView.on("click", "button", function () {
        var value = $(this).attr("data-n");
        cardviewDifficulty_setValue(value);
    });
}
function cardviewDifficulty_refresh() {
    var $view = $(".cardview-difficulty");
    if (!cardview_getCurrentCard()) {
        $view.hide();
        return;
    }
    else
        $view.show();
    $(".cardview-difficulty-list")
        .find("img")
        .each(function (i, element) {
        var $element = $(element);
        if ($element.parent("button").attr("data-n") <= cardviewDifficulty_getValue())
            $element.attr("src", "images/star-filled.svg");
        else
            $element.attr("src", "images/star-empty.svg");
    });
}
function cardviewDifficulty_setValue(number) {
    number = Math.max(1, Math.min(number, 5));
    var card = cardview_getCurrentCard();
    undoRedo_editProperty(card, "difficulty", number, cardviewDifficulty_refresh);
}
function cardviewDifficulty_getValue() {
    return cardview_getCurrentCard().difficulty || 1;
}
/*

    CARDVIEW - LABELS

*/
function cardviewLabels_init() {
    cardviewLabels_refreshAddList();
    var labelsView = $(".cardview-labels");
    labelsView.on("input", "input[type=text]", function () {
        var input = $(this);
        var label = cardviewLabels_getLabel(input.parents("li"));
        undoRedo_editProperty(label, "name", input.val(), cardviewLabels_updateText, true);
    });
    labelsView.on("input", ".cardview-label-bg", function () {
        var $input = $(this);
        var target = cardviewLabels_getLabel($input.parents("li"));
        undoRedo_editProperty(target, "color", $input.val(), cardviewLabels_updateColors);
    });
    labelsView.on("input", ".cardview-label-color", function () {
        var $input = $(this);
        var target = cardviewLabels_getLabel($input.parents("li"));
        undoRedo_editProperty(target, "textColor", $input.val(), cardviewLabels_updateColors);
    });
    labelsView.on("mouseenter", "li", function () {
        $(this).find(".cardview-label-buttons").show("fast");
    });
    labelsView.on("mouseleave", "li", function () {
        $(this).find(".cardview-label-buttons").hide("fast");
    });
    labelsView.on("click", ".cardview-label-remove", function () {
        var labelID = cardviewLabels_getLabelID($(this).parents("li"));
        var labels = cardview_getCurrentCard().labels;
        var index = labels.indexOf(labelID);
        if (index > -1)
            undoRedo_deleteListItem(labels, index, cardviewLabels_refresh);
    });
    labelsView.on("click", ".cardview-label-delete", function (e) {
        var $li = $(this).parents("li");
        var label = cardviewLabels_getLabel($li);
        undoRedo_deleteLabel(label.id, function () {
            cardviewLabels_refresh();
            cardviewLabels_refreshAddList();
        });
        e.stopPropagation();
    });
    labelsView.on("click", ".cardview-label-edit", function (event) {
        var li = $(this).parents("li");
        cardviewLabels_toggleEditing(li);
        event.stopPropagation();
    });
    labelsView.on("mouseenter", "img", function () {
        var img = $(this);
        var li = img.parents("li");
        var color = li.css("background-color");
        var lightColor = utility_mapColor(color, function (r, g, b) {
            var amount = (255 - Math.min(r, g, b)) / 3;
            return [r + amount, g + amount, b + amount];
        });
        img.css("background-color", lightColor);
    });
    labelsView.on("mouseleave", "img", function () {
        $(this).css("background-color", "#00000000");
    });
    labelsView.on("focusout", "li", function () {
        if (!this.matches(":focus-within"))
            cardviewLabels_stopEditing($(this));
    });
    labelsView.on("click", ".cardview-labels-add", function () {
        cardviewLabels_toggleAddList();
    });
    labelsView.on("focusout", ".cardview-labels-add-list", function () {
        if (!this.matches(":focus-within"))
            cardviewLabels_hideAddList();
    });
    labelsView.on("click", ".cardview-labels-add-list li", function () {
        var $li = $(this);
        if (!cardviewLabels_isEditing($li)) {
            cardviewLabels_hideAddList();
            var card = cardview_getCurrentCard();
            var labelID = cardviewLabels_getLabelID($li);
            undoRedo_pushListItem(card.labels, labelID, cardviewLabels_refresh);
        }
    });
    labelsView.on("click", ".cardview-labels-new", function () {
        undoRedo_createNewLabel(function () {
            cardviewLabels_refreshAddList();
            var $latest = $(".cardview-labels-add-list")
                .find("li:last-child");
            cardviewLabels_startEditing($latest);
        });
    });
}
function cardviewLabels_updateText() {
    $(".cardview-label")
        .each(function (index, li) {
        var $li = $(li);
        var label = cardviewLabels_getLabel($li);
        $li.find("input[type=text]").val(label.name);
    });
}
function cardviewLabels_updateColors() {
    $(".cardview-label")
        .each(function (index, li) {
        var $li = $(li);
        var label = cardviewLabels_getLabel($li);
        var color = label.color || "#bab0b0";
        var textColor = label.textColor || "#ffffff";
        $li.css({
            "color": textColor,
            "background-color": color
        });
        $li.find(".cardview-label-bg").val(color);
        $li.find(".cardview-label-color").val(textColor);
    });
}
function cardviewLabels_toggleEditing(labelLi) {
    if (!cardviewLabels_isEditing(labelLi))
        cardviewLabels_startEditing(labelLi);
    else
        cardviewLabels_stopEditing(labelLi);
}
function cardviewLabels_isEditing(labelLi) {
    return !labelLi.find(".cardview-label-text").prop("disabled");
}
function cardviewLabels_startEditing(labelLi) {
    labelLi.find(".cardview-label-colors").show("fast");
    var text = labelLi.find(".cardview-label-text");
    text.prop("disabled", false);
    text.trigger("select");
    labelLi[0].scrollIntoView();
}
function cardviewLabels_stopEditing(labelLi) {
    labelLi.find(".cardview-label-colors").hide("fast");
    var text = labelLi.find(".cardview-label-text");
    text.prop("disabled", true);
}
function cardviewLabels_refresh() {
    var card = cardview_getCurrentCard();
    var $view = $(".cardview-labels");
    if (card)
        $view.show();
    else {
        $view.hide();
        return;
    }
    var cardLabels = card.labels || [];
    var $listView = $(".cardview-labels-list");
    $listView.html("");
    for (var _i = 0, cardLabels_1 = cardLabels; _i < cardLabels_1.length; _i++) {
        var labelID = cardLabels_1[_i];
        var label = cards_getLabel(labelID);
        if (typeof (label) === "undefined") {
            console.log("Unable to read card label: " + labelID);
            continue;
        }
        $listView.append(cardviewLabels_createElement(label, "cardview-label-remove"));
    }
}
function cardviewLabels_refreshAddList() {
    var $listView = $(".cardview-labels-add-list").find("ol");
    $listView.html("");
    for (var _i = 0, _a = cards_getLabels(); _i < _a.length; _i++) {
        var label = _a[_i];
        $listView.append(cardviewLabels_createElement(label, "cardview-label-delete"));
    }
}
function cardviewLabels_getLabelID(labelElement) {
    var $labelElement = $(labelElement);
    return parseInt($labelElement.attr("data-value"));
}
function cardviewLabels_getLabel(labelElement) {
    return cards_getLabel(cardviewLabels_getLabelID(labelElement));
}
function cardviewLabels_createElement(label, removalClass) {
    var labelID = label.id;
    var labelText = label.name || "(no name)";
    var labelBgColor = label.color || "#bab0b0";
    var labelTextColor = label.textColor || "#ffffff";
    var $li = $("\n            <li class=\"cardview-label\" data-value=\"" + labelID + "\">\n                <div class=\"cardview-label-row1\">\n                    <input class=\"cardview-label-text\" type=\"text\" value=\"" + labelText + "\">\n                    <span class=\"cardview-label-buttons\">\n                        <button class=\"cardview-label-edit\"><img alt=\"edit\" src=\"images/draw.svg\"></button>\n                        <button class=\"" + removalClass + "\"><img alt=\"remove\" src=\"images/delete.svg\"></button>\n                    </span>\n                </div>\n                <div class=\"cardview-label-row2 cardview-label-colors\">\n                    <input class=\"cardview-label-bg\" type=\"color\" value=\"" + labelBgColor + "\">\n                    <input class=\"cardview-label-color\" type=\"color\" value=\"" + labelTextColor + "\">\n                </div>\n            </li>");
    $li.css({
        "color": labelTextColor,
        "background-color": labelBgColor
    });
    $li.find(".cardview-label-text").prop("disabled", true);
    $li.find(".cardview-label-colors").hide();
    $li.find(".cardview-label-buttons").hide();
    return $li;
}
function cardviewLabels_toggleAddList(speed) {
    if (speed === void 0) { speed = "fast"; }
    $(".cardview-labels-add-list").toggle(speed);
}
function cardviewLabels_hideAddList(speed) {
    if (speed === void 0) { speed = "fast"; }
    $(".cardview-labels-add-list").hide(speed);
}

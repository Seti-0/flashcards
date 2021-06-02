
export {
    keyboard_init,
    keyboard_addShortcut
}

const keyboard_modifiers = [
    "Shift", "Control", "Alt", "AltGraph"
]

const keyboard_shortcuts = []
const keyboard_keyMap = new Map()

function keyboard_init() {
    document.addEventListener("keydown", keyboard_handleEvent)

    keyboard_addShortcut({
        "key": "h",
        "modifiers": ["Shift", "Control"],
        "action": function(){
            console.log("Hello from the Example Shortcut, World!")
        },
        // This only applies when there are no modifiers, mind.
        "allowWhileEditingInput": false
    })
}

function keyboard_addShortcut(shortcut) {

    if (!shortcut.key) {
        console.log("Attempted to register shortcut without a key")
        console.log(shortcut)
        return
    }

    if (!shortcut.action) {
        console.log("Attempted to register shortcut without an action")
        console.log(shortcut)
        return
    }

    let id = 1
    for (let item of keyboard_shortcuts)
        if (item.id >= id)
            id = item.id + 1
    shortcut.id = id

    keyboard_shortcuts.push(shortcut)

    if (!(shortcut.key instanceof Array))
        shortcut.key = [shortcut.key]

    for (let key of shortcut.key) {
        key = key.toLowerCase()
        if (!keyboard_keyMap.has(key))
            keyboard_keyMap.set(key, [])
        keyboard_keyMap.get(key).push(shortcut)
    }

    shortcut.modifiers ||= []
    if (!(shortcut.modifiers instanceof Array))
        shortcut.modifiers = [shortcut.modifiers]

    shortcut.modifiers = shortcut.modifiers
        .map(keyboard_checkModifierText)

}

function keyboard_checkModifierText(text) {

    text = text.toLowerCase()

    if (text === "alt") return "Alt"
    else if (text === "altgr" || text === "altgraph") return "AltGraph"
    else if (text === "ctrl" || text === "control") return "Control"
    else if (text === "meta") return "Meta"
    else if (text === "shift") return "Shift"

}

function keyboard_handleEvent(event) {

    const shortcuts = keyboard_keyMap.get(event.key.toLowerCase())
    if (!shortcuts)
        return

    for (let shortcut of shortcuts) {

        if (shortcut.modifiers.length === 0 && !shortcut.allowWhileEditingInput) {
            const $focus = $(":focus")
            if ($focus.is("input") || $focus.attr("contenteditable"))
                continue
        }

        const modifiersMatch = keyboard_modifiers.every(function(mod) {
            const requirement = shortcut.modifiers.includes(mod)
            const current = event.getModifierState(mod)
            return requirement === current
        })

        if (modifiersMatch) {
            shortcut.action()
            event.stopPropagation()
            event.preventDefault()
            break
        }
    }

}
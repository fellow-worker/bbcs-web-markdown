import { getDefaultKeyBinding } from 'draft-js';
import { getSelectedBlock } from 'draftjs-utils';
import { onKeyDownVerseParser } from './bibleVerse'

export const keyBindingFn = (event, editorState) => {

    // Do a backspace detection first, prevent from interfering
    if(event.keyCode === 8) return getDefaultKeyBinding(event);

    // Get the current select block
    const block = getSelectedBlock(editorState);

    // Check if a bible verse has been typed
    let command = onKeyDownVerseParser(block, editorState, event);
    if(command !== null) return command;

    // Check for a list start  No space, then nothing will happen
    command = checkList(event, block);
    if(command !== null) return command;

    // fall back on default key
    return getDefaultKeyBinding(event);
}



const checkList = (event, block) => {
    if (event.keyCode !== 32) return null;
    const listStart = hasListStart(block);
    if(listStart === null) return null;
    return listStart;
}

const hasListStart = block => {
    if(block.getType() !== 'unstyled' || block.getDepth() !== 0) return null;
    switch(block.getText()) {
        case '*' : return 'unordered-list-item';
        case '1.' : return 'ordered-list-item';
        default: return null;
    }
}
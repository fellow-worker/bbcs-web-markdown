import { getDefaultKeyBinding } from 'draft-js';
import { getSelectedBlock } from "draftjs-utils";

export const keyBindingFn = (event, editorState) => {

    // No space, then nothing will happen
    if (event.keyCode !== 32) return getDefaultKeyBinding(event);

    const block = getSelectedBlock(editorState);
    const listStart = hasListStart(block);

    if(listStart === null) return getDefaultKeyBinding(event);
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
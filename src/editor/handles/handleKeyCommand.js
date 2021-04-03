import {  RichUtils, EditorState, Modifier  } from 'draft-js';
import { handleSplitBlockCommand } from './splitBlock';

export const handleKeyCommand = (command, editorState) => {
    switch(command) {
        case "split-block" : return handleSplitBlockCommand(editorState);
        case "backspace" : return handleBackspace(editorState);
        default : return RichUtils.handleKeyCommand(editorState, command );
    }
}

const handleBackspace = (editorState) => {
    const selection = editorState.getSelection()
    if (selection.getHasFocus() === false) return RichUtils.handleKeyCommand(editorState, "backspace" );

    const startKey = selection.getStartKey();
    const startOffset = selection.getStartOffset();
    const endKey = selection.getEndKey()
    const endOffset = selection.getEndOffset()

    if (startKey === endKey && startOffset === endOffset) return RichUtils.handleKeyCommand(editorState, "backspace" );

    const content = editorState.getCurrentContent()
    return EditorState.push(editorState, Modifier.removeRange(content, selection, 'forward'), 'remove-range')
}
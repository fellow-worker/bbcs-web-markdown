import { RichUtils } from 'draft-js';
import { handleSplitBlockCommand } from './splitBlock';
import { handleBackspace } from './backspace'
import { insertList } from './insertList'

export const handleKeyCommand = (command, editorState) => {
    switch (command) {
        case 'unordered-list-item':
        case 'ordered-list-item':
            return insertList(editorState, command);
        case "split-block":
            return handleSplitBlockCommand(editorState);
        case "backspace":
            return handleBackspace(editorState);
        default:
            return RichUtils.handleKeyCommand(editorState, command);
    }
}
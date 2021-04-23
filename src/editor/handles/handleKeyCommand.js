import { RichUtils } from 'draft-js';
import { handleSplitBlockCommand } from './splitBlock';
import { handleBackspace } from './backspace'
import { insertList } from './insertList'
import { insertBibleVerseEntity } from './bibleVerse'

export const handleKeyCommand = (command, editorState) => {

    // dealing with commands that have arguments
    const args = command?.args;
    if(command.command) command = command.command;

    switch (command) {
        case 'unordered-list-item':
        case 'ordered-list-item':
            return insertList(editorState, command);
        case "split-block":
            return handleSplitBlockCommand(editorState);
        case "backspace":
            return handleBackspace(editorState);
        case "bible-text" :
            return insertBibleVerseEntity(editorState, args);
        default:
            return RichUtils.handleKeyCommand(editorState, command);
    }
}
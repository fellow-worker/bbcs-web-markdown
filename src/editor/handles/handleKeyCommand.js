import {  RichUtils  } from 'draft-js';
import { handleSplitBlockCommand } from './splitBlock';
import { handleBackspace } from './backspace'

export const handleKeyCommand = (command, editorState) => {
    switch(command) {
        case "split-block" : return handleSplitBlockCommand(editorState);
        case "backspace" : return handleBackspace(editorState);
        default : return RichUtils.handleKeyCommand(editorState, command );
    }
}
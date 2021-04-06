import {  RichUtils  } from 'draft-js';
import { handleSplitBlockCommand } from './splitBlock';
import { removeEntityFromSelection, getEntityInSelection } from '../../util/draftjs'

const inlineTypes = [ 'IMAGE', 'YOUTUBE'];

export const handleKeyCommand = (command, editorState) => {
    switch(command) {
        case "split-block" : return handleSplitBlockCommand(editorState);
        case "backspace" : return handleBackspace(editorState);
        default : return RichUtils.handleKeyCommand(editorState, command );
    }
}

const handleBackspace = (editorState) => {
    const entity = getEntityInSelection(editorState);
    if(entity === null || inlineTypes.includes(entity.type) === false) return RichUtils.handleKeyCommand(editorState, "backspace" );
    return removeEntityFromSelection(editorState, entity.key);
}
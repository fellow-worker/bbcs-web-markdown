import {  RichUtils  } from 'draft-js';
import { handleSplitBlockCommand } from './splitBlock';
import { removeEntity, getCurrentBlock, getCurrentEntity } from '../../util/draftjs'

const inlineTypes = [ 'IMAGE', 'YOUTUBE'];

export const handleKeyCommand = (command, editorState) => {
    switch(command) {
        case "split-block" : return handleSplitBlockCommand(editorState);
        case "backspace" : return handleBackspace(editorState);
        default : return RichUtils.handleKeyCommand(editorState, command );
    }
}

const handleBackspace = (editorState) => {

    const currentBlock = getCurrentBlock(editorState);
    const { entity, key } = getCurrentEntity(editorState);

    if(entity === null) return RichUtils.handleKeyCommand(editorState, "backspace" );

    if(inlineTypes.includes(entity.type) === false) return RichUtils.handleKeyCommand(editorState, "backspace" );

    return removeEntity(editorState, currentBlock, key);
}
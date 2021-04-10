import {  RichUtils, EditorState  } from 'draft-js';
import { getSelectedBlocksMap } from 'draftjs-utils'
import { removeEntityFromSelection, getEntityInSelection, getBlockInSelection } from 'util/draftjs'

const inlineTypes = [ 'IMAGE', 'YOUTUBE', 'VIMEO'];

export const handleBackspace = (editorState) => {

    // Check of lists
    const block = getBlockInSelection(editorState);
    if(block.type === 'unordered-list-item' || block.type === 'ordered-list-item') return handleUnIndent(editorState, block);

    // Check for the custom blocks
    const entity = getEntityInSelection(editorState);
    if(entity === null || inlineTypes.includes(entity.type) === false) return RichUtils.handleKeyCommand(editorState, "backspace" );
    return removeEntityFromSelection(editorState, entity.key);
}

const handleUnIndent = (editorState, block) => {
    if(block.text !== "" || block.depth === 0) return RichUtils.handleKeyCommand(editorState, "backspace" );

    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    let blockMap = contentState.getBlockMap();
    const blocks = getSelectedBlocksMap(editorState).map(b => {
      let depth = b.getDepth() - 1;
      depth = Math.max(0, Math.min(depth, 6));
      return b.set('depth', depth);
    });
    blockMap = blockMap.merge(blocks);

    const withAdjustment = contentState.merge({blockMap, selectionBefore: selectionState, selectionAfter: selectionState,});

    return EditorState.push(editorState, withAdjustment, 'adjust-depth');
}
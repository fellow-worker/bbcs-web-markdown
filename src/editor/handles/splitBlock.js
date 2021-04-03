
import {  EditorState, ContentState, ContentBlock, genKey } from 'draft-js';

export const handleSplitBlockCommand = editorState => {

    // Get the current block type
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    // Determine if the current block (the own that is pressed) is a header
    if(blockType.startsWith('header') === false || selection.isCollapsed() === false) return null;

    // If that is the case, new block should be created and added
    const contentState = editorState.getCurrentContent();
    const newBlock = new ContentBlock({ key: genKey(), type: "unstyled", text: "" });
    const newBlockMap = contentState.getBlockMap().set(newBlock.getKey(), newBlock);

    // Additional the selection should be set to the correct location
    const selectionAfter = contentState.getSelectionAfter().merge({ anchorKey: newBlock.getKey(), anchorOffset: 0, focusKey: newBlock.getKey(), focusOffset: 0, isBackward: false, });

    // And a new content state should be created
    const newContentState = ContentState.createFromBlockArray(newBlockMap.toArray()).set('selectionAfter', selectionAfter)

    // Update and return the editor state
    return EditorState.push(editorState,newContentState,"split-block")
}
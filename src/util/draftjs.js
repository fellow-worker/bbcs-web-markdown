import { EditorState, Modifier } from 'draft-js';

export const getEntityInSelection = (editorState) => {
    const selection = editorState.getSelection()

    const anchorOffset = selection.getAnchorOffset();
    const startKey = selection.getStartKey();
    const contentState = editorState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(startKey);
    const currentEntityKey = currentBlock.getEntityAt(anchorOffset);

    if (currentEntityKey === null) return null;
    let currentEntity = contentState.getEntity(currentEntityKey);
    currentEntity.key = currentEntityKey;
    return currentEntity;
}


export const getBlockInSelection = (editorState) => {
    const selection = editorState.getSelection()
    const startKey = selection.getStartKey();
    const contentState = editorState.getCurrentContent();
    return contentState.getBlockForKey(startKey);
}

export const removeEntityFromSelection = (editorState, entityKey) => {
    const block = getBlockInSelection(editorState);
    const removedEntityState = removeEntityContent(editorState, block, entityKey);
    const removedContentState = Modifier.replaceText(removedEntityState.getCurrentContent(), removedEntityState.getSelection(), '');
    return EditorState.push(editorState, removedContentState, 'apply-entity');
}

export const removeEntity = (editorState, block, entityKey) => {
    const removedEntityState = removeEntityContent(editorState, block, entityKey);
    const removedContentState = Modifier.replaceText(removedEntityState.getCurrentContent(), removedEntityState.getSelection(), '');
    return EditorState.push(editorState, removedContentState, 'apply-entity');
}

export const removeEntityContent = (editorState, block, entityKey) => {
    const contentState = editorState.getCurrentContent();
    const entitySelection = getSelectionOfEntity(editorState, block, entityKey);
    const newContentState = Modifier.applyEntity(contentState, entitySelection, null);
    return EditorState.push(editorState, newContentState, 'apply-entity');
}

export const getSelectionOfEntity = (editorState, block, entityKey) => {
    const selectionState = editorState.getSelection();
    let entitySelection = null;
    block.findEntityRanges(
        (character) => character.getEntity() === entityKey,
        (start, end) => {
            entitySelection = selectionState.merge({
                anchorOffset: start,
                focusOffset: end
            });
        }
    );
    return entitySelection;
}
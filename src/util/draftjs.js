import { EditorState, Modifier, AtomicBlockUtils, SelectionState } from 'draft-js';

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

export const insertAtomicBlock = (editorState, entityType, data ) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(entityType,'IMMUTABLE',data);
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set( editorState, { currentContent: contentStateWithEntity });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
}

export const removeBlock = (editorState, blockKey) => {

    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(blockKey);

    var targetRange = new SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: block.getLength(),
    });

    const withoutBlock = Modifier.removeRange(content, targetRange, 'backward');
    const newState = EditorState.push(editorState, withoutBlock, 'remove-range');
    return EditorState.forceSelection(newState, withoutBlock.getSelectionAfter());
}

export const getEntities = (contentBlock) => {
    let ranges = [];
    contentBlock.findEntityRanges(() => true, (start,end) => ranges.push(start));
    let entities = [];
    ranges.forEach(start => {
        const entity = contentBlock.getEntityAt(start);
        if(entity !== null) entities.push(entity);
    } )
    return entities;
}
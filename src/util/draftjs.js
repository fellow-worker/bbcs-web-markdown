import { EditorState, Modifier, AtomicBlockUtils, SelectionState, genKey, ContentBlock, ContentState } from 'draft-js';

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

export const getEntities = (contentState, contentBlock, type = null) => {
    let ranges = [];
    contentBlock.findEntityRanges(() => true, (start,end) => ranges.push({start,end}));
    let entities = [];
    ranges.forEach(range => {

        const entityKey = contentBlock.getEntityAt(range.start);
        if(entityKey === null) return;
        const entity = contentState.getEntity(entityKey);

        const entityType = entity.getType();
        if(type !== null && entityType !== type) return;
        entities.push({ start : range.start, end: range.end, key : entityKey, type : entityType, entity : entity});
    } )
    return entities; //.sort((a,b) => a.start - b.start);
}

export const insertEmptyBlock = (editorState, contentState) => {
    const anchorKey = genKey();
    const nextBlock = new ContentBlock({ key: anchorKey, type: "unstyled", text: "" });
    const blockMap = contentState.getBlockMap().set(nextBlock.getKey(), nextBlock);
    const inserted = ContentState.createFromBlockArray(blockMap.toArray());
    editorState = EditorState.set(editorState, { currentContent: inserted });
    const selection = new SelectionState({ anchorKey, anchorOffset : 0, focusOffset : 0, focusKey: anchorKey,  isBackward: false, });
    return EditorState.forceSelection(editorState, selection);
}
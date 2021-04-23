
import { KeyBindingUtil, Modifier, SelectionState, EditorState } from 'draft-js';
import { getSelectedBlock } from 'draftjs-utils';
import { getEntities, insertEmptyBlock } from 'util/draftjs'

import { parse, terminationRegexp, reduce } from 'parser/parser'

export const onKeyDownVerseParser = (block, editorState, event) => {

    // Ignoring special keys (like ctrl, alt, cmd)
    if(KeyBindingUtil.hasCommandModifier(event) === true) return null;

    // Bible texts are detected in unstyled blocks only
    if(isSupportedBlock(block) === false) return null;

    // Only deal with parsing if we have a terminating character or enter
    if(terminationRegexp.test(event.key) === false && event.keyCode !== 13) return null;

    // Get the last entity for text parsing
    const result = getVerseInTail(editorState, block)

    return (result.parsed !== null && result.parsed.length > 0) ? { command : "bible-text", args : { key : event.key } } : null;
}

export const insertBibleVerseEntity = (editorState, args) => {

    const block = getSelectedBlock(editorState);
    const reference = getVerseInTail(editorState, block); // since we have a tails detection only one reference can be found

    // Create a new entity with the parsed verse
    const contentState = editorState.getCurrentContent();
    const anchorOffset = reference.parsed[0].start + reference.offset;
    const focusOffset = anchorOffset + reference.parsed[0].length;

    const textWithEntity = createVerseEntity(contentState, block, anchorOffset, focusOffset, reference.parsed[0].input, reduce(reference.parsed) );
    editorState = EditorState.set(editorState, { currentContent: textWithEntity });

    // Determine that to the with the key that was pressed.Insert the text (pressed key) or insert a bew block (upon enter);
    if(args.key.toLowerCase() !== "enter") return insertText(editorState, textWithEntity, block, focusOffset + 1, args.key);
    return insertEmptyBlock(editorState, textWithEntity);

}

const isSupportedBlock = block => {
    return (block.getType() !== 'unstyled' || block.getDepth() !== 0) === false;
}

const insertText = (editorState, contentState, block, anchorOffset, text) => {
    const anchorKey = block.getKey();
    const selection = new SelectionState({ anchorKey, anchorOffset, focusOffset : anchorOffset, focusKey: anchorKey,  isBackward: false, });
    const inserted = Modifier.insertText(contentState, selection, text, null, null);
    editorState = EditorState.set(editorState, { currentContent: inserted });
    return EditorState.forceSelection(editorState, selection);
}

const getVerseInTail = (editorState, block) => {
    const contentState = editorState.getCurrentContent();
    const entities = getEntities(contentState, block);
    const start = (entities.length === 0) ? 0 : entities[entities.length - 1].end;
    const text = block.getText().substr(start);
    return { parsed : parse(text), offset : start };
}

const createVerseEntity = (contentState, block, anchorOffset, focusOffset, text, verses  ) => {
    const contentStateWithEntity = contentState.createEntity('BIBLEVERSE','IMMUTABLE', verses);
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let selection = new SelectionState({ anchorKey: block.getKey(), anchorOffset, focusKey: block.getKey(), focusOffset, isBackward: false, });
    return Modifier.applyEntity(contentStateWithEntity, selection, entityKey);
}

export const parseBlock = (contentState, blockKey) => {

    let block = contentState.getBlockForKey(blockKey);
    if(isSupportedBlock(block) === false) return contentState;

    const references = parse(block.getText());
    if(references === null) return contentState;

    references.forEach(ref => {
        contentState = createVerseEntity(contentState, block, ref.start, ref.end + 1, ref.input, reduce([ref]));
        block = contentState.getBlockForKey(blockKey);
    })

    return contentState;
}
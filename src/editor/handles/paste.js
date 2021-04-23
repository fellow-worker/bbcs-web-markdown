import { getSelectedBlock } from "draftjs-utils";
import { Modifier, EditorState, ContentState, SelectionState } from "draft-js";
import { parseBlock } from './bibleVerse'

export const handlePastedText = (text, html, editorState, onChange) => {

  const selectedBlock = getSelectedBlock(editorState);
  if (selectedBlock && selectedBlock.type === "code") return handlePastedCode(text, editorState, onChange);

  return handlePastedPlainText(text, editorState, onChange);
};

const handlePastedCode = (text, editorState, onChange) => {
  const contentState = Modifier.replaceText(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    text,
    editorState.getCurrentInlineStyle()
  );

  onChange(EditorState.push(editorState, contentState, "insert-characters"));
  return true;
}

const handlePastedPlainText = (text, editorState, onChange) => {
  const pastedBlocks = ContentState.createFromText(text).blockMap;
  let contentState = Modifier.replaceWithFragment(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    pastedBlocks,
  );

  contentState.getBlockMap().forEach(block => {
    contentState = parseBlock(contentState, block.getKey());
  })

  editorState = EditorState.push(editorState, contentState, "insert-fragment");
  const anchorKey = contentState.getBlockMap().last().getKey();
  const selection = new SelectionState({ anchorKey, anchorOffset : 0, focusOffset : 0, focusKey: anchorKey,  isBackward: false, });
  editorState = EditorState.forceSelection(editorState, selection);

  onChange(editorState);
  return true;
}
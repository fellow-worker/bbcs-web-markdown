import { getSelectedBlock } from "draftjs-utils";
import { Modifier, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { List } from "immutable";

export const handlePastedText = (text, html, editorState, onChange) => {

  const selectedBlock = getSelectedBlock(editorState);
  if (selectedBlock && selectedBlock.type === "code") return handlePastedCode(text, editorState, onChange);
  if (html) return handlePastedHtml(html, editorState, onChange);


  return false;
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

const handlePastedHtml = (html, editorState, onChange) => {
    const contentBlock = htmlToDraft(html);
    let contentState = editorState.getCurrentContent();
    contentBlock.entityMap.forEach((value, key) => {
      contentState = contentState.mergeEntityData(key, value);
    });
    contentState = Modifier.replaceWithFragment(
      contentState,
      editorState.getSelection(),
      new List(contentBlock.contentBlocks)
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
    return true;
}
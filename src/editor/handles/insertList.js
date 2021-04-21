import { RichUtils, Modifier, EditorState } from 'draft-js';
import { getSelectedBlock } from "draftjs-utils";

export const insertList = (editorState, listType) => {
    const block = getSelectedBlock(editorState);
    const newEditorState = RichUtils.toggleBlockType(editorState, listType);
    const contentState = newEditorState.getCurrentContent();
    const selection = newEditorState.getSelection();
    const blockSelection = selection.merge({
        anchorOffset: 0,
        focusOffset: block.getLength()
    });

    const newContentState = Modifier.replaceText(
        contentState,
        blockSelection,
        ''
    );

    return EditorState.push(newEditorState, newContentState);
};
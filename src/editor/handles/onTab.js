import { RichUtils } from 'draft-js';
import { getBlockInSelection } from 'util/draftjs'

export const onTab = (event, editorState) => {
    const block = getBlockInSelection(editorState);
    if(block === null) return null;

    if(block.type === 'unordered-list-item' || block.type === 'ordered-list-item') {
        return RichUtils.onTab(event, editorState, 6);
    }

    event.preventDefault();
    return null;
}

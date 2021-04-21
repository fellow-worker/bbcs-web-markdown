import { EditorState, convertFromRaw } from 'draft-js';
import { getDecorator } from './getDecorator'

export const getInitialContent = content => {
    const decorator = getDecorator();
    if (!content) return EditorState.createEmpty(decorator)
    const contentState = convertFromRaw(content);
    return EditorState.createWithContent(contentState, decorator);
}
import { Editor, EditorState, convertFromRaw } from 'draft-js';

import { styleMap } from 'editor/handles/styleMap'

import { getDecorator } from '../getDecorator'

const Text = ({content}) => {

    const decorator = getDecorator();
    const contentState = convertFromRaw(content);
    const editorState = EditorState.createWithContent(contentState, decorator);

    return (
        <Editor
            customStyleMap={styleMap}
            editorState={editorState}
            readOnly={true}
        />
    );
}

export default Text;
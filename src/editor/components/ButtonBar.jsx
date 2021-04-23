import styled from 'styled-components';

import * as Actions from '../actions'

export const ButtonBar = ({editorState, setEditorState, editor, onImageModalRequest, onFileModalRequest, config }) => {

    console.log(config.styles);
    return (
        <Bar>
            <Actions.Styles editorState={editorState} onChange={setEditorState} styles={config.styles} />
            <Separate show={config.styles.length > 0} />
            <Actions.Bold editorState={editorState} onChange={setEditorState} />
            <Actions.Italic editorState={editorState} onChange={setEditorState} />
            <Actions.Underline editorState={editorState} onChange={setEditorState} />
            <Actions.StrikeThrough editorState={editorState} onChange={setEditorState} />
            <Actions.Superscript editorState={editorState} onChange={setEditorState} />
            <Actions.Subscript editorState={editorState} onChange={setEditorState} />
            <Separate show={config.numberedList || config.bulletList} />
            <Actions.ListBulleted show={config.numberedList} editorState={editorState} onChange={setEditorState} />
            <Actions.ListNumbered show={config.bulletList} editorState={editorState} onChange={setEditorState} />
            <Separate show={config.hasMedia} />
            <Actions.Link show={config.link} editorState={editorState} onChange={setEditorState} />
            <Actions.Image show={config.image} onImageModalRequest={onImageModalRequest} editorState={editorState} onChange={setEditorState} editor={editor} />
            <Actions.YouTube show={config.youTube} editorState={editorState} onChange={setEditorState} />
            <Actions.Vimeo show={config.vimeo} editorState={editorState} onChange={setEditorState} />
        </Bar>
    )
}


const Bar = styled.div`
    color: #212121;
    background-color: #f5f5f5;
    border-color: #dddddd;
    padding:5px;
    display:flex;
`;

const Separate =  styled.div`
    width:4px;
    display: ${props => props.show ? 'inherit' : 'none'}
`
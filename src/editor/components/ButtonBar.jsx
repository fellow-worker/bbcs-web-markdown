import styled from 'styled-components';

import * as Actions from '../actions'



export const ButtonBar = ({editorState, setEditorState, editor }) => {

    return (
        <Bar>
            <Actions.Styles editorState={editorState} onChange={setEditorState} />
            <Separate />
            <Actions.Bold editorState={editorState} onChange={setEditorState} />
            <Actions.Italic editorState={editorState} onChange={setEditorState} />
            <Actions.Underline editorState={editorState} onChange={setEditorState} />
            <Actions.StrikeThrough editorState={editorState} onChange={setEditorState} />
            <Actions.Superscript editorState={editorState} onChange={setEditorState} />
            <Actions.Subscript editorState={editorState} onChange={setEditorState} />
            <Separate />
            <Actions.ListBulleted editorState={editorState} onChange={setEditorState} />
            <Actions.ListNumbered editorState={editorState} onChange={setEditorState} />
            <Separate />
            <Actions.Link editorState={editorState} onChange={setEditorState} />
            <Actions.Image editorState={editorState} onChange={setEditorState} editor={editor} />
            <Actions.YouTube  editorState={editorState} onChange={setEditorState} />
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
`
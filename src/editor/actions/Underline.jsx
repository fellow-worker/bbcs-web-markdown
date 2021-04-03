import { RichUtils } from 'draft-js'
import { getSelectionInlineStyle } from 'draftjs-utils';
import { FormatUnderlined } from '@styled-icons/material-outlined'
import { Button } from '../components/Button'

const Bold = ({editorState, onChange}) => {

    let active = false;
    try { active = getSelectionInlineStyle(editorState)?.UNDERLINE === true } catch { }

    const onClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"))
    };

    return <Button tooltip="Onderstrepen" onClick={onClick} active={active}><FormatUnderlined /></Button>
}

export default Bold;
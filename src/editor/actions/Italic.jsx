import { RichUtils } from 'draft-js'
import { getSelectionInlineStyle } from 'draftjs-utils';
import { FormatItalic } from '@styled-icons/material-outlined'
import { Button } from '../components/Button'

const Italic = ({editorState, onChange}) => {

    let active = false;
    try { active = getSelectionInlineStyle(editorState)?.ITALIC === true } catch { }

    const onClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"))
    };

    return <Button tooltip="Italic" onClick={onClick} active={active}><FormatItalic /></Button>
}

export default Italic;
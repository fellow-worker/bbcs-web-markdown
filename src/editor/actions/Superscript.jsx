import { RichUtils } from 'draft-js'
import { getSelectionInlineStyle } from 'draftjs-utils';
import { Superscript } from '@styled-icons/material-outlined'
import { Button } from '../components/Button'

const SuperscriptButton = ({editorState, onChange}) => {

    let active = false;
    try { active = getSelectionInlineStyle(editorState)?.SUPERSCRIPT === true } catch { }

    const onClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, "SUPERSCRIPT"))
    };

    return <Button tooltip="Superscript" onClick={onClick} active={active}><Superscript /></Button>
}

export default SuperscriptButton;
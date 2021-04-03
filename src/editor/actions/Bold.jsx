import { RichUtils } from 'draft-js'
import { getSelectionInlineStyle } from 'draftjs-utils';
import { FormatBold } from '@styled-icons/material-outlined'
import { Button } from '../components/Button'

const Bold = ({editorState, onChange}) => {

    let active = false;
    try { active = getSelectionInlineStyle(editorState)?.BOLD === true } catch { }

    const onClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"))
    };

    return <Button tooltip="Vet" onClick={onClick} active={active}><FormatBold /></Button>
}

export default Bold;
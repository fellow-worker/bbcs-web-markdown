import { RichUtils } from 'draft-js'
import { getSelectionInlineStyle } from 'draftjs-utils';
import { Subscript } from '@styled-icons/material-outlined'
import { Button } from '../components/Button'

const SubscriptButton = ({editorState, onChange}) => {

    let active = false;
    try { active = getSelectionInlineStyle(editorState)?.SUBSCRIPT === true } catch { }

    const onClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, "SUBSCRIPT"))
    };

    return <Button tooltip="Subscript" onClick={onClick} active={active}><Subscript /></Button>
}

export default SubscriptButton;
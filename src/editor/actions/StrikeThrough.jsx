import { RichUtils } from 'draft-js'
import { getSelectionInlineStyle } from 'draftjs-utils';
import { StrikethroughS } from '@styled-icons/material-outlined'
import { Button } from '../components/Button'

const StrikeThrough = ({editorState, onChange}) => {

    let active = false;
    try { active = getSelectionInlineStyle(editorState)?.STRIKETHROUGH === true } catch { }

    const onClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"))
    };

    return <Button tooltip="Doorhalen" onClick={onClick} active={active}><StrikethroughS /></Button>
}

export default StrikeThrough;
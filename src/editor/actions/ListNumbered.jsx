import { RichUtils } from 'draft-js'

import { FormatListNumbered } from '@styled-icons/material-outlined'
import { Button } from '../components/Button'

const ListNumbered = ({editorState, onChange, show}) => {
    if(show === false) return null;
    const onClick = () => {
        const state = RichUtils.toggleBlockType(editorState,"ordered-list-item")
        onChange(state);
    };

    return <Button tooltip="Geordende lijst" onClick={onClick}><FormatListNumbered /></Button>
}

export default ListNumbered;
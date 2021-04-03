import { RichUtils } from 'draft-js'

import { FormatListBulleted } from '@styled-icons/material-outlined'
import { Button } from '../components/Button'

const ListBulleted = ({editorState, onChange}) => {

    const onClick = () => {
        const state = RichUtils.toggleBlockType(editorState,"unordered-list-item")
        onChange(state);
    };

    return <Button tooltip="Ongeordende lijst" onClick={onClick}><FormatListBulleted /></Button>
}

export default ListBulleted;
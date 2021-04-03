import { RichUtils, EditorState } from 'draft-js'
import { getSelectionEntity } from 'draftjs-utils';
import { Button } from '../components/Button'
import { InsertLink, LinkOff } from '@styled-icons/material-outlined'

const Link = ({onChange, editorState}) => {

    // Detect is currently a hyperlink is selected
    const entityKey = getSelectionEntity(editorState);
    const entity = (entityKey) ? editorState?.getCurrentContent()?.getEntity(entityKey) : undefined;
    const isHyperLink = entity?.getType()?.toUpperCase() === 'LINK';

    // Check if there is selection at all
    const hasSelection = editorState !== null && editorState.getSelection()?.isCollapsed() === false;

    const onInsertLink = () => {
        const url = prompt("Insert link");
        const state = insertLink(editorState, url);
        onChange(state);
    }

    const onRemoveLink = () => {
        const state = removeLink(editorState);
        onChange(state);
    }

    if(isHyperLink !== true) return <Button disabled={hasSelection !== true} onClick={onInsertLink} tooltip= "Link invoegen"><InsertLink /></Button>;
    return <Button onClick={onRemoveLink} tooltip= "Link verwijderen"><LinkOff /></Button>;
}

const insertLink = (editorState, url) => {

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK','MUTABLE', {url: url});
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    // Apply entity
    let nextEditorState = EditorState.set(
        editorState,
        { currentContent: contentStateWithEntity }
    );

    // Apply selection
    return RichUtils.toggleLink(
        nextEditorState,
        nextEditorState.getSelection(), entityKey
    )
}

const removeLink = (editorState) => {
    const selection = editorState.getSelection();
    if (selection.isCollapsed() === true) return null;
    return RichUtils.toggleLink(editorState, selection, null);
}

export default Link;
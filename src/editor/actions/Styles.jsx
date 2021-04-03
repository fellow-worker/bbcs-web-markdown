import { RichUtils } from 'draft-js';
import { getSelectedBlocksType  } from 'draftjs-utils'
import { DropDown } from '../components/DropDown';
import { Style } from '@styled-icons/material-outlined'

const styles = [
    { blockType : 'unstyled', example : <span>Normaal</span>},
    { blockType : 'header-two', example : <h2>Kop 2</h2> },
    { blockType : 'header-three', example : <h3>Kop 3</h3> },
    { blockType : 'header-four', example : <h4>Kop 4</h4> }
]

const Styles = ({onChange, editorState}) => {

    const onChangeStyle = style => {
        onChange(RichUtils.toggleBlockType(editorState, style));
    }

    const blockType = getSelectedBlocksType(editorState);
    return <DropDown icon={<Style />} text="Stijlen" options={styles} onSelect={onChangeStyle} selected={blockType} />
}

export default Styles;
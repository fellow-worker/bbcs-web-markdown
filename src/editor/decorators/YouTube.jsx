import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import Resizer from '../../components/Resizer'
import YouTubeEmbedded from './../../components/YouTube';
import ToolBar from './ToolBar'


const YouTube = ({contentState, entityKey}) => {
    const { videoId, width } = contentState.getEntity(entityKey).getData();
    const [ showToolBar, setShowToolBar ] = useState(false);

    const onMouseEnter = () => { setShowToolBar(true) }
    const onMouseLeave = () => { setShowToolBar(false) }

    const onWidthChange = (newWidth) => {
        setShowToolBar(false);
        contentState.replaceEntityData(entityKey,{ videoId : videoId, width : newWidth });
    }

    const onResize = () => {

    }

    return (
        <Wrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} width={width}>
            <ToolBar show={showToolBar} onWidthChange={onWidthChange} onResize={onResize} />
            <YouTubeEmbedded videoId={videoId} width="100%" />
        </Wrapper>
    );
};


const Wrapper = styled.div`
    width : ${props => props.width};
`

export default YouTube;
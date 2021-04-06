import { useEffect, useRef } from 'react'
import ToolBarContainer from './ToolBarContainer'
import YouTubeEmbedded from 'components/YouTube'
import { setFigure} from './Regular'
import { useForceUpdate } from 'util/react';
import styled from 'styled-components'

const YouTubeRegular = (props) => {
    const ref = useRef(null);
    const forceUpdate = useForceUpdate();

    const {width, videoId, alignment } = props;

    useEffect(() => {
        if(ref?.current === null) forceUpdate();
    },[width, alignment, forceUpdate]);

    if(ref?.current !== null) setFigure(ref, alignment, width);
    else setTimeout(forceUpdate, 0);

    const useAlignment = alignment && alignment !== 'none';

    return (
        <>
            <ToolBarContainer {...props}>
                <RefBox ref={ref} >
                    <YouTubeEmbedded videoId={videoId} width="100%" />
                </RefBox>
            </ToolBarContainer>
            { useAlignment && <YouTubeEmbedded videoId={videoId} width="100%" /> }
        </>
    )
}

const RefBox = styled.div`
    width:100%;
    padding:0;
    margin:0;
`
export default YouTubeRegular;
import { useEffect, useRef } from 'react'
import { setFigure} from 'editor/decorators/helpers/Regular'
import { useForceUpdate } from 'util/react';
import styled from 'styled-components'

const Video = ({contentState, entityKey, children}) => {
    const ref = useRef(null);
    const forceUpdate = useForceUpdate();

    const {width, alignment } = contentState.getEntity(entityKey).getData();

    useEffect(() => {
        if(ref?.current === null) forceUpdate();
    },[width, alignment, forceUpdate]);

    if(ref?.current !== null) setFigure(ref, alignment, width);
    else setTimeout(forceUpdate, 0);

    return (
        <>
            <RefBox ref={ref}>
                {children}
            </RefBox>
        </>
    )
}

const RefBox = styled.div`
    width:100%;
    padding:0;
    margin:0;
`
export default Video;
import { useEffect, useRef } from 'react'
import ToolBarContainer from './ToolBarContainer'
import { setFigure} from './Regular'
import { useForceUpdate } from 'util/react';
import styled from 'styled-components'

const YouTubeRegular = (props) => {
    const ref = useRef(null);
    const forceUpdate = useForceUpdate();

    const {width, alignment } = props;

    useEffect(() => {
        if(ref?.current === null) forceUpdate();
    },[width, alignment, forceUpdate]);

    if(ref?.current !== null) setFigure(ref, alignment, width);
    else setTimeout(forceUpdate, 0);

    const useAlignment = alignment && alignment !== 'none';

    const onDeleteBlock = () => {
        if(ref?.current === null) return;
        const wrapper = ref.current.closest('.editor-wrapper');
        const event = new CustomEvent('delete-block', { detail : { entityKey : props.entityKey, blockKey : props.blockKey }});
        wrapper.dispatchEvent(event);
    }

    return (
        <>
            <ToolBarContainer {...props} onDeleteBlock={onDeleteBlock}>
                <RefBox ref={ref}>
                    {props.children}
                </RefBox>
            </ToolBarContainer>
            { useAlignment && props.children}
        </>
    )
}

const RefBox = styled.div`
    width:100%;
    padding:0;
    margin:0;
`
export default YouTubeRegular;
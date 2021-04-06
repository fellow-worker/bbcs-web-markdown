import { useEffect, useRef } from 'react'
import styled from 'styled-components';
import ToolBarContainer from './ToolBarContainer'
import { setFigure} from './Regular'
import { useForceUpdate } from 'util/react';

const ImageRegular = (props) => {
    const ref = useRef(null);
    const forceUpdate = useForceUpdate();

    const {width, src, alignment } = props;

    useEffect(() => {
        if(ref?.current === null) forceUpdate();
    },[width, alignment, forceUpdate]);

    if(ref?.current !== null) setFigure(ref, alignment, width);
    else setTimeout(forceUpdate, 0);

    const useAlignment = alignment && alignment !== 'none';

    return (
        <>
            <ToolBarContainer {...props}>
                <Image alt="" ref={ref} src={src} />
            </ToolBarContainer>
            { useAlignment && <Image alt="" src={src} /> }
        </>
    )
}

const Image = styled.img`
    width : 100%;
    user-select: none;
    -webkit-user-select: none;
    cursor: default;
`

export default ImageRegular;
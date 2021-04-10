import { useEffect, useRef } from 'react'
import styled from 'styled-components';
import { setFigure} from 'editor/decorators/helpers/Regular'
import { useForceUpdate } from 'util/react';

const Image = ({contentState, entityKey}) => {

    const data = contentState.getEntity(entityKey).getData();

    const ref = useRef(null);
    const forceUpdate = useForceUpdate();

    const {width, src, alignment } = data;

    useEffect(() => {
        if(ref?.current === null) forceUpdate();
    },[width, alignment, forceUpdate]);

    if(ref?.current !== null) setFigure(ref, alignment, width);
    else setTimeout(forceUpdate, 0);

    return (
        <StyledImage alt="" ref={ref} src={src} />
    )
}

const StyledImage = styled.img`
    width : 100%;
    user-select: none;
    -webkit-user-select: none;
    cursor: default;
`

export default Image;
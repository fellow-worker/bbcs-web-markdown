import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import Resizer from '../../components/Resizer'

import { ToolBar, ObjectWrapper } from './../components/ToolBar'
import { Button } from './../components/Button'


const Image = (props) => {

    const ref = useRef(null);
    const [ selected, setSelected ] = useState(false);
    const [ container, setContainer ] = useState(null);
    const { src, width } = props.contentState.getEntity(props.entityKey).getData();

    const handleClickOutside = (event) => {
        if (ref.current && ref.current.contains(event.target) === false) setSelected(false);
    };

    useEffect(() => {
        if(container !== null) return;

        // This is a small hack. Resizer needs a container to be able to determine the left|right boundaries
        if(ref.current !== null) setContainer(ref.current.closest("div.DraftEditor-root"));
    });

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    if(src === null) return null;

    const onClick = (e) => {
        setSelected(!selected);
    }

    if(selected === false) return <StyledImage width={width} onClick={onClick} src={src} />;

    const onWidthChange = (newWidth) => {
        props.contentState.replaceEntityData(props.entityKey,{ src : src, width : newWidth });
    }

    return (
        <div ref={ref}>
            <Resizer onWidthChange={onWidthChange} container={container} width={width}>
                <Overlay onClick={onClick} src={src} />
            </Resizer>
        </div>
    )
};

const StyledImage = styled.img`
    width : ${props => props.width};
`

const Overlay = styled.img`
    filter: brightness(70%);
    -webkit-user-select: none;
    user-select: none;
`

export default Image;
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';

import { ToolBar, ObjectWrapper } from './../components/ToolBar'
import { Button } from './../components/Button'


const Image = (props) => {

    const ref = useRef(null);
    const [ selected, setSelected ] = useState(false);
    const {src} = props.contentState.getEntity(props.entityKey).getData();

    const handleClickOutside = (event) => {
        if (ref.current && ref.current.contains(event.target) === false) setSelected(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    const onClick = (e) => {
        setSelected(!selected);
    }

    if(selected === false) return <img onClick={onClick} src={src} />;

    return (
        <div>
            <Overlay onClick={onClick} src={src} />
        </div>
    )
};


const Overlay = styled.img`
    filter: brightness(70%);
`

export default Image;
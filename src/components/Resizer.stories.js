import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Resizer from './Resizer'
import YouTubeEmbedded from './YouTube';

export default { title: 'Components/Resizer' };

export const Image = () => {

    const ref = useRef(null);
    const [ container, setContainer ] = useState(null);

    useEffect(() => {
        setContainer(ref)
    })

    return (
        <Container ref={ref}>
            <Resizer container={container?.current} width="50%">
                <img draggable="false" src="https://upload.wikimedia.org/wikipedia/commons/0/09/Polar_Bear_-_Alaska.jpg" alt="Polar Bear" />
            </Resizer>
        </Container>
    );
}

export const YouTube = () => {

    const ref = useRef(null);
    const [ container, setContainer ] = useState(null);

    useEffect(() => {
        setContainer(ref)
    })

    return (
        <Container ref={ref}>
            <Resizer container={container?.current} width="100%">
                <YouTubeEmbedded draggable="false" videoId="XtwIT8JjddM" />
            </Resizer>
        </Container>
    );
}

const Container = styled.div`
    width:100%;
`
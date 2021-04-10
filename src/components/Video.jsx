import styled from 'styled-components'

export const VideoFrame = ({frameId, url, allow, width}) => {

    // Default value for the width of a YouTube video is 100%
    width = (width) ? width : '100%';

    // Determine the height of the frame based on the width
    let height;
    if(width.endsWith('%') === true) height = (parseFloat(width.slice(0, -1)) * 0.5625) + '%';
    else if(width.endsWith('px') === true) height = (parseFloat(width.slice(0, -2)) * 0.5625) + 'px';
    else height = (parseFloat(width) * 0.5625) + 'px';

    const allowed = `${allow} fullscreen`;

    return (
        <Container width={width} height={height}>
            <IFrame id={frameId} type="text/html"  src={url} allow={allowed} allowfullscreen frameborder="0" />;
        </Container>
    );
}

const IFrame = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border:0px solid black;
    box-sizing:border-box;
`

const Container = styled.div`
    position: relative;
    width: ${props => props.width};
    height: 0;
    padding-bottom: ${props => props.height};
`
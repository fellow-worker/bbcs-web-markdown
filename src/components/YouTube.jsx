import styled from 'styled-components'

const YouTube = ({videoId, width}) => {

    // Default value for the width of a YouTube video is 100%
    width = (width) ? width : '100%';

    // Determine the height of the frame based on the width
    let height;
    if(width.endsWith('%') === true) height = (parseFloat(width.slice(0, -1)) * 0.5625) + '%';
    else if(width.endsWith('px') === true) height = (parseFloat(width.slice(0, -2)) * 0.5625) + 'px';
    else height = (parseFloat(width) * 0.5625) + 'px';

    const url = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
    const frameId = `ytplayer-${videoId}`;
    return (
        <Container width={width} height={height}>
            <Iframe id={frameId} type="text/html"  src={url} allow="encrypted-media; picture-in-picture" allowfullscreen frameborder="0" />;
        </Container>
    );
}

const Iframe = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

const Container = styled.div`
    position: relative;
    width: ${props => props.width};
    height: 0;
    padding-bottom: ${props => props.height};
`

export default YouTube;
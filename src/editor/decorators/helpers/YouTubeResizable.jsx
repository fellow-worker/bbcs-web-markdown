import { useState, useEffect, useRef } from 'react'
import Resizer from 'components/Resizer'
import YouTubeEmbedded from 'components/YouTube'

const YouTubeResizable = ({videoId, onLeaveResize, onWidthChange}) => {

    const ref = useRef(null);
    const [ container, setContainer ] = useState(null);
    const [ parent, setParent ] = useState(null);

    const handleClickOutside = (event) => {
        if (ref.current && ref.current.contains(event.target) === false) onLeaveResize();
    };

    useEffect(() => {
        if(container !== null) return;

        // This is a small hack. Resizer needs a container to be able to determine the left|right boundaries
        setContainer(ref.current.closest("div.DraftEditor-root"));
        setParent(ref.current.closest("figure"));

    },[setContainer, container, parent, setParent]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return (
        <div ref={ref}>
            <Resizer parent={parent}  onWidthChange={onWidthChange} container={container} width="100%">
                <YouTubeEmbedded videoId={videoId} width="100%" />
            </Resizer>
        </div>
    )
};

export default YouTubeResizable;
import { useState } from 'react'
import VideoRegular from './helpers/VideoRegular'
import VideoResizable from './helpers/VideoResizable'
import { useForceUpdate } from 'util/react';

const Video = ({contentState, entityKey, children, blockKey}) => {
    const [ inResizeMode, setInResizeMode ] = useState(false);
    const forceUpdate = useForceUpdate();

    const onEnterResize = () => { setInResizeMode(true); }
    const onLeaveResize = () => { setInResizeMode(false); }

    const onWidthChange = (width) => {
        setInResizeMode(false);
        const alignment = width === '100%' ? 'none' : data.alignment;
        contentState.replaceEntityData(entityKey,{ videoId : data.videoId, width : width, alignment : alignment });
        forceUpdate();
    }

    const onAlignmentChange = (alignment) => {
        contentState.replaceEntityData(entityKey,{ videoId : data.videoId, width : data.width, alignment : alignment });
        forceUpdate();
    };

    const data = contentState.getEntity(entityKey).getData();
    const params = {...data, onLeaveResize, onEnterResize, onWidthChange, onAlignmentChange, entityKey, blockKey };

    if(inResizeMode === true) return <VideoResizable {...params}>{children}</VideoResizable>;
    return <VideoRegular {...params}>{children}</VideoRegular>;
}

export default Video;
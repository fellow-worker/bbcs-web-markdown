import { useState } from 'react'
import YouTubeRegular from './helpers/YouTubeRegular'
import YouTubeResizable from './helpers/YouTubeResizable'
import { useForceUpdate } from 'util/react';

const Image = ({contentState, entityKey}) => {
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
    const params = {...data, onLeaveResize, onEnterResize, onWidthChange, onAlignmentChange };

    if(inResizeMode === true) return <YouTubeResizable {...params} />;
    return <YouTubeRegular {...params} />;
}

export default Image;
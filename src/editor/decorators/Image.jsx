import { useState } from 'react'
import ImageRegular from './helpers/ImageRegular'
import ImageResizable from './helpers/ImageResizable'
import { useForceUpdate } from 'util/react';

const Image = ({contentState, entityKey}) => {
    const [ inResizeMode, setInResizeMode ] = useState(false);
    const forceUpdate = useForceUpdate();

    const onEnterResize = () => { setInResizeMode(true); }
    const onLeaveResize = () => { setInResizeMode(false); }

    const onWidthChange = (width) => {
        setInResizeMode(false);
        const alignment = width === '100%' ? 'none' : data.alignment;
        contentState.replaceEntityData(entityKey,{ src : data.src, width : width, alignment : alignment });
        forceUpdate();
    }

    const onAlignmentChange = (alignment) => {
        contentState.replaceEntityData(entityKey,{ src : data.src, width : data.width, alignment : alignment });
        forceUpdate();
    };

    const data = contentState.getEntity(entityKey).getData();
    const params = {...data, onLeaveResize, onEnterResize, onWidthChange, onAlignmentChange };

    if(inResizeMode === true) return <ImageResizable {...params} />;
    return <ImageRegular {...params} />;
}

export default Image;
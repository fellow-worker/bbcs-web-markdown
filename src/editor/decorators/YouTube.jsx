import { useState, useEffect, useRef } from 'react'

const Image = (props) => {

    const {videoId} = props.contentState.getEntity(props.entityKey).getData();
    const url = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
    const frameId = `ytplayer-${videoId}`;
    return <iframe id={frameId} type="text/html" width="640" height="360" src={url} frameborder="0"></iframe>;
};

export default Image;
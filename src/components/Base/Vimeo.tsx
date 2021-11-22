import { useEffect, useState } from 'react';
import { VideoContainer } from './VideoContainer'

export const Vimeo = (props : { videoId : string }) => {

    const { videoId } = props;
     const [ html, setHtml ] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchEmbedded = async () => {
            const result = await fetch("https://vimeo.com/api/oembed.json?url=https://vimeo.com/" + videoId);
            const body = await result.json();
            setHtml(body.html);
        }
        fetchEmbedded();
    }, [ videoId ]);


    if(!html) return null;
    return (
        <VideoContainer  dangerouslySetInnerHTML={{__html: html}} />
    );
}
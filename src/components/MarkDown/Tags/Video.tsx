import { getYouTubeId } from "../../../util/inline/youtube";
import { getVimeoVideoId } from '../../../util/inline/vimeo';
import * as Base from '../../Base'

export const Video = (props : { url? : string }) => {
    const { url } = props;
    if(!url) return null;

    const youtubeId = getYouTubeId(url);
    if(youtubeId) return <Base.Youtube videoId={youtubeId} />

    const vimeoVideoId = getVimeoVideoId(url);
    if(vimeoVideoId) return <Base.Vimeo videoId={vimeoVideoId} />

    return <Base.Video url={url} />;
}


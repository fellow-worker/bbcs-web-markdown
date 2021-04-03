import { CompositeDecorator } from 'draft-js'
import Image from '../decorators/Image';
import YouTube from '../decorators/YouTube';

export const getDecorator = () => {
    return new CompositeDecorator([
        { strategy: findLinkEntities, component: Link },
        { strategy: findImageEntities, component: Image },
        { strategy: findYouTubeEntities, component: YouTube },
    ]);
}

const findLinkEntities = (contentBlock, callback, contentState) => {
  return findEntities(contentBlock, callback, contentState, 'LINK')
}

const findImageEntities = (contentBlock, callback, contentState) => {
  return findEntities(contentBlock, callback, contentState, 'IMAGE')
}

const findYouTubeEntities = (contentBlock, callback, contentState) => {
  return findEntities(contentBlock, callback, contentState, 'YOUTUBE')
}


const findEntities = (contentBlock, callback, contentState, type) => {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === type
        );
      },
      callback
    );
  }

const Link = (props) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return <a href={url}>{props.children}</a>
};
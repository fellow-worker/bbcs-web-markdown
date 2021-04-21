import { CompositeDecorator } from 'draft-js'
import * as components from './decorators'
import * as methods from 'util/strategy'

export const getDecorator = () => {
  return new CompositeDecorator([
    { strategy: methods.findLinkEntities, component: components.Link },
    { strategy: methods.findImageEntities, component: components.Image },
    { strategy: methods.findYouTubeEntities, component: components.YouTube },
    { strategy: methods.findVimeoEntities, component: components.Vimeo },
    { strategy: methods.findBibleText, component: components.BibleText },
  ]);
}
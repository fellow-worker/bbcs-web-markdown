import { CompositeDecorator } from 'draft-js'
import * as components from './decorators'
import * as methods from 'util/strategy'

export const getDecorator = () => {

 /* let strategies = BookList.map(book => {
    const regexp = new RegExp(`${book.term}[ ][1-9][0-9:\\-,][ .\\])\\}]`, 'g');
    const strategy = (contentBlock, callback, contentState) => { return findWithRegex(regexp, contentBlock, callback) };
    return { strategy: strategy, component: BibleText }

  })*/

  return new CompositeDecorator([
    { strategy: methods.findLinkEntities, component: components.Link },
    { strategy: methods.findImageEntities, component: components.Image },
    { strategy: methods.findYouTubeEntities, component: components.YouTube },
    { strategy: methods.findVimeoEntities, component: components.Vimeo },
  ]);
}
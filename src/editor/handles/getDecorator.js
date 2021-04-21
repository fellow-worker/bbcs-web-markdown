import { CompositeDecorator } from 'draft-js'
import * as components from '../decorators'
import * as strategies from 'util/strategy'

export const getDecorator = () => {
    return new CompositeDecorator([
        { strategy: strategies.findLinkEntities, component: components.Link },
        { strategy: strategies.findImageEntities, component: components.Image },
        { strategy: strategies.findYouTubeEntities, component: components.YouTube },
        { strategy: strategies.findVimeoEntities, component: components.Vimeo },
        { strategy: strategies.findBibleText, component: components.BibleText },
    ]);
}
import specs from "../../../util/specs"
import * as Tags from './index'
import { TagProps } from './TagProps'

export const Tag = (props : TagProps) => {
    const { active } = props;

    switch(active.type)  {
        case specs.bold.type:
            return <Tags.Bold {...props} />
        case specs.italic.type:
            return <Tags.Italic {...props} />
        case specs.image.type:
            return <Tags.Image {...props} />
        case specs.link.type:
            return <Tags.Link {...props} />
        case specs.code.type:
            return <Tags.Code {...props} />
        default:
            return null;
    }
}
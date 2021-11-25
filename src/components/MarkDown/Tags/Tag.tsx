import { InlineType } from "../../../types";
import * as Tags from './index'
import { TagProps } from './TagProps'

export const Tag = (props : TagProps) => {
    const { active } = props;

    switch(active.type)  {
        case InlineType.Bold:
            return <Tags.Bold {...props} />
        case InlineType.Italic:
            return <Tags.Italic {...props} />
        case InlineType.Image:
            return <Tags.Image {...props} />
        case InlineType.Link:
            return <Tags.Link {...props} />
        case InlineType.Code:
            return <Tags.Code {...props} />
        case InlineType.SuperScript:
            return <Tags.SuperScript {...props} />
        case InlineType.SubScript:
            return <Tags.SubScript {...props} />
        case InlineType.Reference:
            return <Tags.Reference {...props} />
        case InlineType.Verse:
            return <Tags.Verse {...props} />
        default:
            return null;
    }
}
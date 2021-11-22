import { head } from "@/util/inline/annotations";
import { TagProps } from "./TagProps";
import { VerseReference } from '@/types'
import * as Base from '@/components/Base'

export const Verse = (props : TagProps) => {
    const { text, active, onVerseClick } = props;
    const reference = active as VerseReference;

    reference.children = undefined;
    const verse = head(text, reference);

    const onClick = () => {
        onVerseClick(reference.ref);
    }

    return (
        <Base.Verse onClick={onClick}>{verse}</Base.Verse>
    )
}
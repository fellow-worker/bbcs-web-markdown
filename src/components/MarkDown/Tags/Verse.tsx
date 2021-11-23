import { TagProps } from "./TagProps";
import { VerseReference } from '@/types'
import * as Base from '@/components/Base'

export const Verse = (props : TagProps) => {
    const { text, active, onVerseClick } = props;
    const reference = active as VerseReference;
    const verse = text.substr(reference.index, reference.length);

    const onClick = () => {
        onVerseClick(reference.ref);
    }

    return (
        <Base.Verse onClick={onClick}>{verse}</Base.Verse>
    )
}
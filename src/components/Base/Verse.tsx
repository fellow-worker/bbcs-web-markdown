import { Props } from './Props'

type VerseProps = Props & {
    onClick: () => void | undefined;
}

export const Verse = (props : VerseProps) => {
    const { children, onClick } = props;
    return <span onClick={onClick} className="verse">{children}</span>
}
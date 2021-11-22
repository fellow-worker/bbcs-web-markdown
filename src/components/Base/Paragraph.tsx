import { Props } from './Props'

type ParagraphProps = Props & {
    className? : string
}

export const Paragraph = (props : ParagraphProps) => {
    const { children, className } = props;
    return <p className={className}>{children}</p>
}
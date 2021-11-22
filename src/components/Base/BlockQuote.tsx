import { Props } from './Props'

export const BlockQuote = (props : Props) => {
    const { children } = props;
    return <blockquote>{children}</blockquote>
}
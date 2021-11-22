import { Props } from './Props'

export const Italic = (props : Props) => {
    const { children } = props;
    return <em>{children}</em>
}
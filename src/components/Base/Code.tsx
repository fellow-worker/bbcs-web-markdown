import { Props } from './Props'

export const Code = (props : Props) => {
    const { children } = props;
    return <code>{children}</code>
}
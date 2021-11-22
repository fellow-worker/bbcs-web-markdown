import { Props } from './Props'

export const UnorderedList = (props : Props) => {
    const { children } = props;
    return <ul>{children}</ul>
}
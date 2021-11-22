import { Props } from './Props'

export const ListItem = (props : Props) => {
    const { children } = props;
    return <li>{children}</li>
}
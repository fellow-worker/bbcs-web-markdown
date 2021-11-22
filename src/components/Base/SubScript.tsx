import { Props } from './Props'

export const SubScript = (props : Props) => {
    const { children } = props;
    return <sub>{children}</sub>
}
import { Props } from './Props'

export const SuperScript = (props : Props) => {
    const { children } = props;
    return <sup>{children}</sup>
}
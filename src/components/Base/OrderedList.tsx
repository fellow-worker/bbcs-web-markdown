import { Props } from './Props'

type OrderedListProps = Props & {
    type : "a" | "i" | "1" | "A" | "I" | undefined,
    start?: number
}

export const OrderedList = (props : OrderedListProps) => {
    const { children, type, start } = props;
    return <ol start={start} type={type}>{children}</ol>
}
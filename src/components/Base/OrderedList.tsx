import { Props } from './Props'

type OrderedListProps = Props & {
    type : "a" | "i" | "1" | "A" | "I" | undefined
}

export const OrderedList = (props : OrderedListProps) => {
    const { children, type } = props;
    return <ol type={type}>{children}</ol>
}
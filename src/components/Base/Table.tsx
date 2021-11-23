import { Props } from './Props'

export const Table = (props : Props) => {
    const { children } = props;
    return (
        <table><tbody>{children}</tbody></table>
    )
}

export const Head = (props : Props) => {
    const { children } = props;
    return (
        <tr className="header">{children}</tr>
    )
}

export const Row = (props : Props) => {
    const { children } = props;
    return (
        <tr>{children}</tr>
    )
}

type CellProps = Props & { align : "left" | "center" | "right" | "none" | "justify", span? : number }
export const Cell = (props : CellProps) => {
    const { children, align, span } = props;
    return (
        <td colSpan={span} className={align}>{children}</td>
    )
}
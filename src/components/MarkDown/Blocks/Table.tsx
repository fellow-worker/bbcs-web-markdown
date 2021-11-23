import { parseTable } from '../../../util/block/table';
import { BlockProps } from './BlockProps'
import * as Base from '@/components/Base'
import { Inline } from '../Inline';
import { Alignment, Table as Type } from '@/types';

export const Table = (props : BlockProps) => {
    const { block } = props;
    const table = parseTable(block.text);

    return (
        <Base.Table>
            <Head {...props} table={table} />
            {table.rows.map((row, index) => <Base.Row key={index} ><Row table={table} {...props} cells={row} /></Base.Row>)}
        </Base.Table>
    )
}

type HeadProps = BlockProps & { table : Type }
const Head = (props : HeadProps) => {
    const { table } = props;

    if(!table.header) return null;
    const full = table.columns === table.header?.values.length
    const single = table.header?.values.length === 1;

    return (
        <Base.Head>
            {full && <Row {...props} table={table} cells={table.header.values} /> }
            {single && <Base.Cell span={table.columns} align="center"><Inline {...props} text={table.header.values[0]} /></Base.Cell> }
        </Base.Head>
    );
}

type RowProps = HeadProps & {cells : string[] }
const Row = (props : RowProps) => {
    const { cells, table } = props;
    return (
        <>
            {cells.map((cell, index ) =>
                <Base.Cell align={align(table,index)} key={index}><Inline {...props} text={cell} /></Base.Cell>  )
            }
        </>
    )
}

const align = (table : Type, cell : number) => {
    if(!table.header) return Alignment.Left;
    return table.header.align[cell];
}
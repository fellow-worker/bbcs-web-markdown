import { Document, ListItem } from 'types'

export type ListProps = {
    document : Document,
    items: ListItem[],
    level : number,
    onVerseClick : (ref : string) => any
}
import { Document, ListItem } from '../../../types'

export type ItemProps = {
    item : ListItem
    document : Document,
    onVerseClick : (ref : string) => any
}
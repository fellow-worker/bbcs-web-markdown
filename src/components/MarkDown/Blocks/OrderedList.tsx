import { BlockProps } from './BlockProps'
import { clearLineOrderedList, parse } from "@/util/block/list";
import { Inline } from "../Inline";
import { ListProps } from './ListProps'
import { ItemProps } from './ItemProps'
import * as Base from '@/components/Base'

export const OrderedList = (props : BlockProps) => {
    const text = props.block.text;
    const items = parse(text, clearLineOrderedList);
    return <List {...props} items={items} level={0} />
}

const List = (props : ListProps) => {
    const { items, level } = props;
    if(!items || items.length === 0) return null;

    const type = (level % 2 === 0) ? undefined : "a";
    return (
        <Base.OrderedList type={type}>
            {props.items.map((item,index) => <Item {...props} key={index} item={item} />)}
        </Base.OrderedList>
    )
}

const Item = (props : ItemProps) => {
    const { item } = props;
    return (
        <Base.ListItem>
            <Inline {...props} text={item.text} />
            <List {...props} items={item.sub} level={item.level + 1} />
        </Base.ListItem>
    )
}
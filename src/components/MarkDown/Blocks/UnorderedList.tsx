import { BlockProps } from './BlockProps'
import { clearLineUnorderedList, parse } from "../../../util/block/list";
import { Inline } from "../Inline";
import { ListProps } from './ListProps'
import { ItemProps } from './ItemProps'
import * as Base from '../../Base'

export const UnorderedList = (props : BlockProps) => {
    const text = props.block.text;
    const { items } = parse(text, clearLineUnorderedList);
    return <List {...props} items={items} level={0} />
}

const List = (props : ListProps) => {
    const { items } = props;
    if(!items || items.length === 0) return null;
    return (
        <Base.UnorderedList>
            {props.items.map((item,index) => <Item {...props} key={index} item={item} />)}
        </Base.UnorderedList>
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
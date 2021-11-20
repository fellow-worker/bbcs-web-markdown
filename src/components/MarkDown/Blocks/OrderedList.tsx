
import { clearLineOrderedList, parse, ListItem } from "../../../util/list";
import { Inline } from "../Inline";

export const OrderedList = (props : {text : string }) => {
    const { text } = props;
    const items = parse(text, clearLineOrderedList);
    return <List items={items} level={0} />
}

const List = (props : { items: ListItem[], level : number }) => {
    const { items, level } = props;
    if(!items || items.length === 0) return null;

    const type = (level % 2 === 0) ? undefined : "a";
    return (
        <ol type={type}>
            {props.items.map((item,index) => <Item key={index} item={item} />)}
        </ol>
    )
}

const Item = (props : { item : ListItem}) => {
    const { item } = props;
    return (
        <li>
            <Inline text={item.text} />
            <List items={item.sub} level={item.level + 1} />
        </li>
    )
}


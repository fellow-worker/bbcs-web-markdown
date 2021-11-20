
import { clearLineUnorderedList, parse, ListItem } from "../../../util/list";
import { Inline } from "../Inline";

export const UnorderedList = (props : {text : string }) => {
    const { text } = props;
    const items = parse(text, clearLineUnorderedList);
    return <List items={items} level={0} />
}

const List = (props : { items: ListItem[], level : number }) => {
    const { items } = props;
    if(!items || items.length === 0) return null;
    return (
        <ul>
            {props.items.map((item,index) => <Item key={index} item={item} />)}
        </ul>
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


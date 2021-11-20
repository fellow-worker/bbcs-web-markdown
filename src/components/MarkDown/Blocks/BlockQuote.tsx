import { MarkDownBase } from "../MarkDown";

export const BlockQuote = (props : { text : string}) => {

    const text = props.text.replace(/\n>/g,"\n").substr(1);

    return (
        <blockquote>
            <MarkDownBase inner={true} content={text} />
        </blockquote>
    )
}
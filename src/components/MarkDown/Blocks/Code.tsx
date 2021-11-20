export const Code = (props : { text : string}) => {
    const { text } = props;
    const code = text.substr(1,text.length - 2);
    return <code>{code}</code>
}
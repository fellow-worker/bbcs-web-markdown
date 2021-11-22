import { Props } from './Props'

type HyperlinkProps = Props & {
    blank : boolean;
    title? : string;
    href : string;
}

export const Hyperlink = (props : HyperlinkProps) => {
    const { blank, title, href, children } = props;
    if(blank) return <a target="_blank" rel="noreferrer" title={title} href={href}>{children}</a>
    return <a title={title} href={href}>{children}</a>
}
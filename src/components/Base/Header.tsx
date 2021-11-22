import { ReactNode } from "react"

type HeaderProps = {
    level: number;
    id?: string;
    children : ReactNode;
}

export const Header = (props : HeaderProps) => {
    const { id, level, children } = props;
    switch(level) {
        case 1 : return <h1 id={id}>{children}</h1>
        case 2 : return <h2 id={id}>{children}</h2>
        case 3 : return <h3 id={id}>{children}</h3>
        case 4 : return <h4 id={id}>{children}</h4>
        case 5 : return <h5 id={id}>{children}</h5>
        case 6 : return <h6 id={id}>{children}</h6>
        default : return null;
    }
}
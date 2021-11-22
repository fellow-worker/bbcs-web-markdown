import { CSSProperties } from "react";

type ImageProps = {
    alt? : string,
    title? : string,
    align : "right" | "none" | "center" | "left" | "justify";
    width? : number,
    src? : string
}

export const Image = (props : ImageProps) => {
    const { alt, title, align, width, src } = props;

    const className = align !== "none" ? align : "";
    const style = {} as CSSProperties;

    style.width = width ? width + "%" : "100%";
    return <img style={style} className={className} alt={alt} title={title} src={src} />
}
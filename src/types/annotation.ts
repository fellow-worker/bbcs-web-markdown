import { InlineType } from ".";

export type Annotation = {
    type: InlineType;
    index: number;
    length: number;
    children?: Annotation;
};

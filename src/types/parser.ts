import { InlineType } from './inlineType'

export type Parser = {
    regexp: RegExp[];
    type: InlineType;
    intermediate?: (value: string) => [ string, number ];
};

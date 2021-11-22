import { InlineType, Parser } from '@/types'
import { replaceAt } from '../string'

export const bold = {
    regexp : [ /\*{2}[^*?]+\*{2}/ , /_{2}[^_?]+_{2}/ ],
    intermediate : (value : string) => [ "§§" + value.substr(2,value.length - 4) + "§§", value.length ],
    type : InlineType.Bold,
} as Parser

export const italic = {
    regexp : [ /\*{1}[^*?]+\*{1}/ , /_{1}[^_?]+_{1}/ ],
    type : InlineType.Italic,
} as Parser

export const link = {
    regexp : [ /\[[^\n^\]?]+\]\([^\n^)?]+\)/ ],
    type : InlineType.Link,
} as Parser

export const image = {
    regexp : [ /!\[[^\n^\]?]+\]\([^\n^)?]+\)/ ],
    intermediate : (value : string) => {
        value = replaceAt(value, value.indexOf("["), '§')
        value = replaceAt(value, value.indexOf("]"), '§')
        value = replaceAt(value, value.indexOf("("), '¤')
        value = replaceAt(value, value.indexOf(")"), '¤')
        return [ value, value.length ]
    },
    type : InlineType.Image,
} as Parser

export const code = {
    regexp : [ /[^\\]`[^`]+?[^\\]`/ ],
    type : InlineType.Code,
} as Parser

export const superscript = {
    regexp : [ /\^\(.+?\)/ ],
    type : InlineType.SuperScript,
}

export const subscript = {
    regexp : [ /~\(.+?\)/ ],
    type : InlineType.SubScript,
}

export const footnote = {
    regexp : [ /\[\^.+?\][^:]/, /\[\^[^\]]+?\]$/ ],
    intermediate : (value : string) => {
        // since the match is made on additional character add it back
        const last = value[value.length - 1]
        const length = last === "]" ? value.length : value.length - 1;
        return [ value, length ];
    },
    type : InlineType.Reference,
} as Parser

export const parsers = [
    footnote, superscript, subscript, code, image, link, bold, italic,
] as Parser[]
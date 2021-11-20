import { replaceAt } from './string'

export const bold = {
    regexp : [ /\*{2}[^*?]+\*{2}/ , /_{2}[^_?]+_{2}/ ],
    intermediate : (value : string) => "§§" + value.substr(2,value.length - 4) + "§§",
    type : "bold",
    allowChildren : true
} as Spec

export const italic = {
    regexp : [ /\*{1}[^*?]+\*{1}/ , /_{1}[^_?]+_{1}/ ],
    type : "italic",
    allowChildren : true
} as Spec

export const link = {
    regexp : [ /\[[^\n^\]?]+\]\([^\n^)?]+\)/ ],
    type : "link",
    allowChildren : true
} as Spec

export const image = {
    regexp : [ /!\[[^\n^\]?]+\]\([^\n^)?]+\)/ ],
    intermediate : (value : string) => {
        value = replaceAt(value, value.indexOf("["), '§')
        value = replaceAt(value, value.indexOf("]"), '§')
        value = replaceAt(value, value.indexOf("("), '¤')
        value = replaceAt(value, value.indexOf(")"), '¤')
        return value;
    },
    type : "image",
    allowChildren : false
} as Spec

export const code = {
    regexp : [ /[^\\]`[^\n?]+[^\\]`/ ],
    type : "code",
} as Spec

export const parsers = [
    code, image, link, bold, italic,
]

export type Spec = {
    regexp : RegExp[]
    intermediate? : (value : string) => string
    type : string
}

const specs = { bold, italic, image, link, code }
export default specs;


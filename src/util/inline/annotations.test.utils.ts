import { Annotation, Parser } from '@/types';
import { getAnnotations } from './annotations'
import { parsers as all } from './parsers';

export const assert = (expected : Annotation[], actual : Annotation[] ) => {
    expect(actual.length).toBe(expected.length);
    for(let index = 0; index < expected.length; index++) {
        single(expected[index], actual[index]);
    }
}

const single = (expected? : Annotation, actual? : Annotation ) => {
    if(!expected || !actual) return;
    expect(actual.index).toBe(expected.index);
    expect(actual.length).toBe(expected.length);
    expect(actual.type).toBe(expected.type);
    single(actual.children, expected.children);
}

export const run = (text : string, output : string, expected : Annotation[], parsers? : Parser[]) => {

    // Arrange
    if(!parsers) parsers = all;

    // Act
    const [ result, annotations ] = getAnnotations(text, parsers);

    expect(result).toBe(output);
    assert(expected, annotations);
}

type TestParams = Parser & { text : string, expected : string }
export const runParams = (params : TestParams) => {
    run(params.text, params.expected, [{...params, index : 0, length : params.text.length}  ], [ params ])
}
type VerseReference = {
    index : number;
    length : number;
    ref : string;
}

export const assert = (actual : VerseReference[], expected : VerseReference[]) =>  {
    expect(actual.length).toBe(expected.length);

    expected.forEach((item,index)  => single( actual[index], item));
}

const single = (actual : VerseReference, expected : VerseReference) =>  {
    expect(actual.index).toBe(expected.index);
    expect(actual.length).toBe(expected.length);
    expect(actual.ref).toBe(expected.ref);
}
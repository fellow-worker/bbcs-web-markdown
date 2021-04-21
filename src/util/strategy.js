import { reduce, parse } from 'parser/parser'

export const findLinkEntities = (contentBlock, callback, contentState) => {
    return findEntities(contentBlock, callback, contentState, 'LINK')
}

export const findImageEntities = (contentBlock, callback, contentState) => {
    return findEntities(contentBlock, callback, contentState, 'IMAGE')
}

export const findYouTubeEntities = (contentBlock, callback, contentState) => {
    return findEntities(contentBlock, callback, contentState, 'YOUTUBE')
}

export const findVimeoEntities = (contentBlock, callback, contentState) => {
    return findEntities(contentBlock, callback, contentState, 'VIMEO')
}

export const findWithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

const findEntities = (contentBlock, callback, contentState, type) => {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === type
            );
        },
        callback
    );
}

export const findBibleText = (contentBlock, callback, contentState) => {
    const ranges = reduce(parse(contentBlock.getText()));
    if(ranges === null) return;
    ranges.forEach(range => {
        callback(range.start, range.end + 1); // draft-js wants the exclusive upper bound.
    })
}
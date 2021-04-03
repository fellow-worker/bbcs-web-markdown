import {  RichUtils } from 'draft-js';

export const toggleInlineStyle = (style, editorState, data) => {
    switch(style) {
        default : return RichUtils.toggleInlineStyle(editorState, style);
    }
}
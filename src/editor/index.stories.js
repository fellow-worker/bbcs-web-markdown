import '../index.css';

import React from 'react';
import { Editor } from './index';
import Wrapper from './index.stories.wrapper';

export default { title: 'Editor' };

export const Empty = () => {
    return (
        <div className="storybook">
            <Editor />
        </div>
    )
}


export const WithOutput = () => {
    return (
        <div className="storybook">
            <Wrapper />
        </div>
    )
}

export const BasicEditor = () => {
    const  config = { styles : [], vimeo : false, youTube : false, link : false, image : false, bulletList : false, numberedList : false, multiLine : false, }
    return (
        <div className="storybook">
            <Editor config={config}  />
        </div>
    )
}
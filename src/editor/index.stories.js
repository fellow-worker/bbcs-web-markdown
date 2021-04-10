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
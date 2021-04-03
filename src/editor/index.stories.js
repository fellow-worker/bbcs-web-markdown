import '../index.css';

import React from 'react';
import { Editor } from './index';

export default { title: 'Editor' };

export const emptyContent = () => {
    return <div className="storybook"><Editor /></div>;
}
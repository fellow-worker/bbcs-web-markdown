import React from 'react';
import Vimeo from './Vimeo';

export default {
    title: 'Components/Vimeo',
    component : Vimeo,
    argTypes: {
        videoId: '419963616',
    },
};

const ResponsiveTemplate = (args) => {
    return (
        <Vimeo {...args} />
    );
}

export const Responsive = ResponsiveTemplate.bind({});
Responsive.args = { videoId: '419963616' };

const FixedWidthTemplate = (args) => {
    return (
        <Vimeo {...args} />
    );
}

export const FixedWidth = FixedWidthTemplate.bind({});
FixedWidth.args = { videoId: '419963616', width: '640px' };
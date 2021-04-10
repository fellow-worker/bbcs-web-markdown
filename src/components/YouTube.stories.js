import React from 'react';
import YouTube from './YouTube';

export default {
    title: 'Components/YouTube',
    component : YouTube,
    argTypes: {
        videoId: 'XtwIT8JjddM',
    },
};

const ResponsiveTemplate = (args) => {
    return (
        <YouTube draggable="false"{...args} />
    );
}

export const Responsive = ResponsiveTemplate.bind({});
Responsive.args = { videoId: 'XtwIT8JjddM' };

const FixedWidthTemplate = (args) => {
    return (
        <YouTube {...args} draggable="false" />
    );
}

export const FixedWidth = FixedWidthTemplate.bind({});
FixedWidth.args = { videoId: 'XtwIT8JjddM', width: '640px' };
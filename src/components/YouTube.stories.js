import React from 'react';
import YouTube from './YouTube';

export default {
    title: 'Components/YouTube',
    component : YouTube,
    argTypes: {
        children: {
          control: 'text',
        },
    },
};

export const Responsive = () => {
    return (
        <YouTube draggable="false" videoId="XtwIT8JjddM" />
    );
}

const FixedWidthTemplate = (args) => {
    return (
        <YouTube {...args} draggable="false" />
    );
}

export const FixedWidth = FixedWidthTemplate.bind({});
FixedWidth.args = {
    videoId: 'XtwIT8JjddM',
    width: '640px',
};

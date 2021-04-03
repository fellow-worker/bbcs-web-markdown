import { configure } from '@storybook/react';

configure(require.context('../src', true, /\.stories\.js$/), module);
// This will search for .stories.js files inside src directory.

// Then create index.stories.js in src folder


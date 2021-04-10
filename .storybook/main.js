
const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.@(js|mdx)'],
    addons: ['@storybook/addon-essentials', '@storybook/preset-create-react-app'],
    webpackFinal: (config) => {
        config.resolve.modules = [
            path.resolve(__dirname, "..", "src"),
            "node_modules",
          ]
        return config
    }
}
import { MarkDown } from './MarkDown'

import { Story, Meta } from '@storybook/react';
import pkg from '../../../package.json'
import styled from 'styled-components';
import { useEffect } from 'react';

const StyledMarkDown = (props : { content : string }) => {

  useEffect(() => {

  });

  return <Styled><MarkDown {...props} /></Styled>
}

export default {
  title: `BBCS.Client.Text (${pkg.version})/MarkDown`,
  component: MarkDown,
} as Meta;

const DefaultTemplate: Story<{ content : string}> = (args) => <StyledMarkDown {...args} />

export const Default = DefaultTemplate.bind({});
Default.args = { content : "text" };

const Styled = styled.div`
  code {
    padding:2px;
    background-color:lightgray;
    font-family: 'ecs-editor-font', 'Courier New', Courier, monospace;
  }
`
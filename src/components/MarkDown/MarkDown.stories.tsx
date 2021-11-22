import { MarkDown } from './MarkDown'

import { Story, Meta } from '@storybook/react';
import pkg from '../../../package.json'
import styled from 'styled-components';

const StyledMarkDown = (props : { content : string }) => {
  const click = (ref : string) => { alert(ref); }
  return <Styled><MarkDown {...props} onVerseClick={click} /></Styled>
}

export default {
  title: `BBCS.Client.Text (${pkg.version})/MarkDown`,
  component: MarkDown,
} as Meta;

const DefaultTemplate: Story<{ content : string}> = (args) => <StyledMarkDown {...args} />

export const Default = DefaultTemplate.bind({});
Default.args = { content : "text" };

const Styled = styled.div`
  font-family: "Roboto","Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size:14px;
  -webkit-font-smoothing: antialiased;
  letter-spacing: .1px;
  line-height: 21px;

  code {
    padding:2px;
    background-color:lightgray;
    font-family: 'ecs-editor-font', 'Courier New', Courier, monospace;
  }

  blockquote {
    border-left: 4px solid #154879;
    margin:16px 0;
    padding: 4px 16px;
    background-color: #EEEEEE;
  }

  a.reference, a.footnote {
    color : #154879;
    text-decoration: none;
  }

  span.verse {
    color : #154879;
    cursor: pointer;
  }
`
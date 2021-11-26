import { MarkDown } from './MarkDown'

import { Story, Meta } from '@storybook/react';
import pkg from '../../../package.json'
import { BaseStyle } from './../Base/BaseStyle'

const StyledMarkDown = (props : { content : string }) => {
  const click = (ref : string) => { alert(ref); }
  return <BaseStyle><MarkDown {...props} onVerseClick={click} /></BaseStyle>
}

export default {
  title: `BBCS.Client.Text (${pkg.version})/MarkDown`,
  component: MarkDown,
} as Meta;

const DefaultTemplate: Story<{ content : string}> = (args) => <StyledMarkDown {...args} />

export const Default = DefaultTemplate.bind({});
Default.args = { content : "text" };
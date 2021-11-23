import { TextEditor } from './TextEditor'

import { Story, Meta } from '@storybook/react';
import pkg from '../../../package.json'


const Editor = (props : { value : string}) => {

  const onCursorMove = (position : { start : number, end : number }) => {
    console.log(position);
  }

  return (
    <div style={{border: "1px solid #dddddd", boxSizing : "border-box" }}>
      <TextEditor value={props.value} onCursorMove={onCursorMove} />
    </div>
  )
}

export default {
  title: `BBCS.Client.Text (${pkg.version})/TextEditor`,
  component: TextEditor,
} as Meta;

const DefaultTemplate: Story<{ value : string}> = (args) => <Editor {...args} />

export const Default = DefaultTemplate.bind({});
Default.args = { value : "text" };
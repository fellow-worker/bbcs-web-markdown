import { TextEditor } from './TextEditor'

import { Story, Meta } from '@storybook/react';
import pkg from '../../../package.json'
import { useState } from 'react';

type EditorProps = {
  highlighted? : boolean,
  value : string,
  font? : 'Noto Sans Mono' | 'Roboto Mono' | 'JetBrains Mono';
}


const Editor = (props : EditorProps ) => {

  const { highlighted, font } = props;
  const [ value, setValue ] = useState(props.value);

  return (
    <div style={{border: "1px solid #dddddd", boxSizing : "border-box" }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@300&family=Roboto+Mono:wght@300&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&display=swap');
      </style>
      <TextEditor onChange={setValue} font={font} highlighted={highlighted} value={value} />
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
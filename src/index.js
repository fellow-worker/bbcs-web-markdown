import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Editor from './editor/components/Editor';
import { Text } from './text';

ReactDOM.render(
  <React.StrictMode>
    <Editor />
    <Text />
  </React.StrictMode>,
  document.getElementById('root')
);
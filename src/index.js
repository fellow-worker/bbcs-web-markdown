import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'draft-js/dist/Draft.css';
import Editor from './editor/components/Editor';

ReactDOM.render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
  document.getElementById('root')
);
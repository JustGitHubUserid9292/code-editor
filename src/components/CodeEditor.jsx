import React from 'react';
import { Editor} from '@monaco-editor/react';

const CodeEditor = ({ code, setCode }) => {

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <Editor
      language="javascript"
      value={code}
      onChange={handleEditorChange}
      theme="vs-dark"
    />
  );
};

export default CodeEditor;

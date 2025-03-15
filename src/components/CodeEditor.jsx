import React from 'react';
import { Editor} from '@monaco-editor/react';

const CodeEditor = ({ code, setCode, language }) => {

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (<>
  <div className='editor'>
    <Editor
      language={language}
      value={code}
      onChange={handleEditorChange}
      theme="vs-dark"
      loading={<div className="spinner"><i className="ri-loader-4-line spinner-icon"></i></div>}
    />
  </div>
  </>);
};

export default CodeEditor;

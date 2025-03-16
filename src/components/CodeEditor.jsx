import React, { useRef, useEffect } from 'react';
import { Editor, useMonaco } from '@monaco-editor/react';
import { github_dark, twilight, briliance_dull, tomorrow_night_eighties } from '../assets/constants';

const CodeEditor = ({ code, setCode, language, editorTheme }) => {
  const monaco = useMonaco()

  const editorRef = useRef();

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("github-dark", github_dark);
      monaco.editor.defineTheme("twilight", twilight);
      monaco.editor.defineTheme("briliance-dull", briliance_dull);
      monaco.editor.defineTheme("tomorrow-night", tomorrow_night_eighties);
    }
  }, [monaco]);

  return (<>
  <div className={`editor ${editorTheme}`}>
    <Editor
      language={language}
      value={code}
      onMount={onMount}
      onChange={handleEditorChange}
      theme={editorTheme}
      loading={<div className="spinner"><i className="ri-loader-4-line spinner-icon"></i></div>}
      options={{ minimap: { enabled: false }, overviewRulerLanes: 0 }}
    />
  </div>
  </>);
};

export default CodeEditor;

import React, { useRef, useEffect } from 'react';
import { Editor, useMonaco } from '@monaco-editor/react';
import { github_dark, twilight, briliance_dull, tomorrow_night_eighties, active4d, github_light, chrome_devtools, tomorrow } from '../assets/constants';

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
      const themes = {
        "github-dark": github_dark,
        "github-light": github_light,
        twilight,
        "briliance-dull": briliance_dull,
        "tomorrow-night": tomorrow_night_eighties,
        tomorrow,
        active4d,
        "chrome-devtools": chrome_devtools
      };
  
      Object.entries(themes).forEach(([name, data]) => {
        monaco.editor.defineTheme(name, data);
      });

      monaco.editor.setTheme(editorTheme);
    }
  }, [monaco, editorTheme]);
  

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

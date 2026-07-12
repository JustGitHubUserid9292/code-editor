import React, { useState, useEffect } from 'react'
import CodeEditor from './components/CodeEditor';
import Output from './components/Output';
import LanguageSwitcher from './components/LanguageSwitcher';
import EditorThemeSwitcher from './components/EditorThemeSwitcher';
import getOutput from "./requests/getOutput";

function App() {
  const [code, setCode] = useState(() => localStorage.getItem('code') || '');
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [outputTime, setOutputTime] = useState(0)
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'javascript')
  const [editorTheme, setEditorTheme] = useState(() => localStorage.getItem('editorTheme') || 'vs-dark')
  const [isLight, setIsLight] = useState(() => localStorage.getItem('isLight') === 'true')
  
  useEffect(() => {
    localStorage.setItem('code', code)
  }, [code])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  useEffect(() => {
    localStorage.setItem('isLight', isLight);
    document.body.classList.toggle("light", isLight);
  }, [isLight]);

  useEffect(() => {
    localStorage.setItem('editorTheme', editorTheme)
  }, [editorTheme])

  const runCode = async () => {
    const timeoutMs = 54000;
    if (!code || isLoading) return;
    try {
      setOutputTime(performance.now())
      setIsLoading(true);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Execution Timeout: Code took too long to run")), timeoutMs)
      );
      const result = await Promise.race([getOutput(code, language), timeoutPromise]);
      result.program_error ? setOutput(result.program_error.split("\n")) : setOutput(result.program_output.split("\n"))
      result.program_error ? setIsError(true) : setIsError(false);
    } catch(e) {
      setOutput(e.message.split('\n'))
      setIsError(true)
    } finally {
      setIsLoading(false);
      setOutputTime((prevOutputTime) => (performance.now() - prevOutputTime).toFixed(2))
    }
  }

  const resetOutput = () => {
    setOutput('')
    if (isError) setIsError(false)
  }

  const setLight = () => {
    setIsLight((prev) => !prev)
    setEditorTheme(!isLight ? 'vs-light' : 'vs-dark');
  }

  return (
    <>
    <div className={isLight ? 'header light' : 'header'}>
        <h1 className='title'>CodeEditor<span>.</span></h1>
        <button className={isLoading ? 'run-code loading' : 'run-code'} onClick={runCode}><i className={isLoading ? "ri-stop-fill": "ri-play-fill"}></i>{isLoading ? '' : ' Run'}</button>
        <div className="editor-config">
          <EditorThemeSwitcher editorTheme={editorTheme} setEditorTheme={setEditorTheme} isLight={isLight} />
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
          <button className='theme-switcher' onClick={setLight}>{isLight ? <i className="ri-sun-line"></i> : <i className="ri-moon-line"></i>}</button>
        </div>
    </div>
    <div className='container'>
        <CodeEditor code={code} setCode={setCode} language={language} editorTheme={editorTheme} />
        <Output output={output} isLoading={isLoading} isError={isError} outputTime={outputTime} resetOutput={resetOutput} editorTheme={editorTheme}></Output>
    </div>
    </>
  )
}

export default App

import React, { useState } from 'react'
import CodeEditor from './components/CodeEditor';
import Output from './components/Output';
import LanguageSwitcher from './components/LanguageSwitcher';
import EditorThemeSwitcher from './components/EditorThemeSwitcher';
import getOutput from "./requests/getOutput";


function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [outputTime, setOutputTime] = useState(0)
  const [language, setLanguage] = useState('javascript')
  const [editorTheme, setEditorTheme] = useState('vs-dark')

  const runCode = async () => {
    const timeoutMs = 3200
    if (!code || isLoading) return;
    try {
      setOutputTime(performance.now())
      setIsLoading(true);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Execution Timeout: Code took too long to run")), timeoutMs)
      );
      const result = await Promise.race([getOutput(code, language), timeoutPromise]);
      result.run.stderr ? setOutput(result.run.stderr.split("\n")) : setOutput(result.run.output.split("\n"))
      result.run.stderr ? setIsError(true) : setIsError(false);
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

  return (
    <>
    <div className='header'>
        <h1 className='title'>CodeEditor.</h1>
        <button className={isLoading ? 'run-code loading' : 'run-code'} onClick={runCode}><i className={isLoading ? "ri-stop-fill": "ri-play-fill"}></i>{isLoading ? '' : ' Run'}</button>
        <div className="editor-config">
          <EditorThemeSwitcher editorTheme={editorTheme} setEditorTheme={setEditorTheme} />
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
          <button className='theme-switcher'><i className="ri-moon-line"></i></button>
        </div>
    </div>
    <div className='container'>
        <CodeEditor code={code} setCode={setCode} language={language} editorTheme={editorTheme} />
        <Output output={output} isLoading={isLoading} isError={isError} outputTime={outputTime} resetOutput={resetOutput} editorTheme={editorTheme} ></Output>
    </div>
    </>
  )
}

export default App

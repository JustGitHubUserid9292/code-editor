import { use, useState } from 'react'
import CodeEditor from './components/CodeEditor';
import Output from './components/Output';
import LanguageSwitcher from './components/LanguageSwitcher';
import getOutput from "./requests/getOutput";
import jsLogo from "./assets/jsLogo.png"


function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [outputTime, setOutputTime] = useState(0)
  const [language, setLanguage] = useState('javascript')

  const runCode = async () => {
    if (!code) return;
    try {
      setOutputTime(performance.now())
      setIsLoading(true);
      const result = await getOutput(code);
      setOutput(result.run.output)
      result.run.stderr ? setIsError(true) : setIsError(false);
    } catch(e) {
      console.log(e)
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
        <button className='run-code' onClick={runCode}><i className="ri-play-fill"></i> Run</button>
        <div className="editor-config">
          <LanguageSwitcher language={language} />
          <button className='theme-switcher'><i className="ri-moon-line"></i></button>
        </div>
    </div>
    <div className='container'>
        <CodeEditor code={code} setCode={setCode} language={language} />
        <Output output={output} isLoading={isLoading} isError={isError} outputTime={outputTime} resetOutput={resetOutput}></Output>
    </div>
    </>
  )
}

export default App

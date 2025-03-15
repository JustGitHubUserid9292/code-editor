import { useState } from 'react'
import CodeEditor from './components/CodeEditor';
import Output from './components/Output';
import getOutput from "./requests/getOutput";

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const runCode = async () => {
    if (!code) return;
    try {
      setIsLoading(true);
      const result = await getOutput(code);
      setOutput(result.run.output)
    } catch(e) {
      console.log(e)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
    <div className='header'>
        <button className='run-code' onClick={runCode}><i className="ri-play-fill"></i> Run</button>
    </div>
    <div className='container'>
      <div className='editor'>
        <CodeEditor code={code} setCode={setCode}/>
      </div>
      <Output output={output} isLoading={isLoading}></Output>
    </div>
    </>
  )
}

export default App

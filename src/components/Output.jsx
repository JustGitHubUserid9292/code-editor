import React from "react";

const Output = ({ output, isLoading, isError, outputTime, resetOutput, editorTheme }) => {
    return (<>
        <div className={isError ? `output ${editorTheme} error` : `output ${editorTheme}`}>
          {isLoading ? <div className="spinner"><i className="ri-loader-4-line spinner-icon"></i></div> : output ? output.map((line, index) => <p key={index}>{line}</p>) : "Click 'Run' to see the output here"}
          {output ? isLoading ? '' : <div className="output-extra"><span className="execution-time">Execution Time: {outputTime} ms</span><button className="reset-button" onClick={resetOutput}><i className="ri-refresh-line"></i></button></div> : ''}
        </div>
      </>);
}


export default Output
import React from "react";

const Output = ({ output, isLoading, isError, outputTime, resetOutput }) => {
    return (<>
        <div className={isError ? 'output error' : 'output'}>
          {isLoading ? <div className="spinner"><i className="ri-loader-4-line spinner-icon"></i></div> : output ? output : "Click 'Run Code' to see the output here"}
          {output ? isLoading ? '' : <div className="output-extra"><span className="execution-time">Execution Time: {outputTime} ms</span><button className="reset-button" onClick={resetOutput}><i class="ri-refresh-line"></i></button></div> : ''}
        </div>
      </>);
}


export default Output
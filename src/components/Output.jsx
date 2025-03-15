import React, { useState } from "react";

const Output = ({ output, isLoading }) => {
    return (<>
        <div className="output">
          {isLoading ? <div className="spinner"><i className="ri-loader-4-line spinner-icon"></i></div> : output ? output.split(' ').join('\n') : "Click 'Run Code' to see the output here"}
        </div>
      </>);
}


export default Output
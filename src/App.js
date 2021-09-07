import './App.css';
import React from 'react';
import Editor from './components/editor/Editor';

function App() {

  return (
    <div className="header">
      {/* title box */}
      <div className="title">
        <h1 className="title-name">Interview Geek</h1>
      </div>

      {/* main content */}
      <div className="App">
        <div className="left-side">
          <h1>Online Code Compiler</h1>
          <br></br>
        </div>
        <div className="right-side">
          <Editor className="editor"></Editor>
        </div>
      </div>
    </div>

  );
}

export default App;

import './App.css';
import React from 'react';
import Editor from './components/editor/Editor';

function App() {

  return (
    <div className="App">
      <div className="container">
        <h1>Online Code Compiler</h1>
      </div>
      <div className="editor">
        <Editor></Editor>
      </div>

    </div>
  );
}

export default App;

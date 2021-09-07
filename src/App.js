import './App.css';
import React, {useState} from 'react';
import Editor from './components/editor/Editor';
import VideoChat from './components/videocalling/VideoChat';

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
          <VideoChat></VideoChat>
        </div>
        <div className="right-side">
          <Editor className="editor"></Editor>
        </div>
      </div>
    </div>

  );
}

export default App;

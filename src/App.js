import './App.css';
import React, { useState } from 'react';
import Editor from './components/editor/Editor';
import VideoChat from './components/videocalling/VideoChat';

function App() {

  return (
    <div className="header">
      <div className="body">
        
      </div>
      {/* title box */}
      <div className="nav-bar">
        <h1 className="title-name">Interview Geek</h1>
        <div className="nav-items">
          <img className="user-image"
            src="https://media-exp1.licdn.com/dms/image/C4E03AQHuGz4MHPAK_Q/profile-displayphoto-shrink_200_200/0/1619268675081?e=1634774400&v=beta&t=GUzeuzs8jKaK5a657kLWxcaXEefDU6BMmSzs2uVR1yk"></img>
          <p className="user-name-text">Akshay Khanna</p>  
        </div>
      </div>

      {/* main content */}
      <div className="App">
        <div className="left-side">
          <VideoChat></VideoChat>
        </div>
        <div className="divider"></div>
        <div className="right-side">
          <Editor className="editor"></Editor>
        </div>
      </div>
    </div>

  );
}

export default App;

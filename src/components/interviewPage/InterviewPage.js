import './InterviewPage.css';
import React, { useState } from 'react';
import Editor from './editor/Editor';
import VideoChat from './videocalling/VideoChat';

function InterviewPage() {

    return (
        <div className="int-header">
            {/* title box */}
            <div className="int-nav-bar">
                <h1 className="int-title-name">Interview Geek</h1>
                <div className="int-nav-items">
                    <img className="int-user-image"
                        src="https://media-exp1.licdn.com/dms/image/C4E03AQHuGz4MHPAK_Q/profile-displayphoto-shrink_200_200/0/1619268675081?e=1634774400&v=beta&t=GUzeuzs8jKaK5a657kLWxcaXEefDU6BMmSzs2uVR1yk"></img>
                    <p className="int-user-name-text">Akshay Khanna</p>
                </div>
            </div>

            {/* main content */}
            <div className="int-App">
                <div className="int-left-side">
                    <VideoChat></VideoChat>
                </div>
                <div className="int-divider"></div>
                <div className="int-right-side">
                    <Editor className="int-editor"></Editor>
                </div>
            </div>
        </div>

    );
}
export default InterviewPage;
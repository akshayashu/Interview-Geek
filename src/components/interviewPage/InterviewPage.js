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
            <div style={{
                marginTop: '70px',
                height: 'calc(100vh - 60px)',
                width: '100vw',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row'
            }}>

                {/* left-side */}
                <div style={{ flexBasis: 'calc(100% - 5px)', overflowY:'scroll' }}>
                    <VideoChat></VideoChat>
                    <VideoChat></VideoChat>
                    <VideoChat></VideoChat>
                </div>

                {/* gutter */}
                <div style={{ flexBasis: 'calc(10px)' }}>

                </div>

                {/* right-side */}
                <div style={{ flexBasis: 'calc(100% - 5px)' }}>
                    <Editor className="int-editor"></Editor>
                </div>

            </div>

            {/* main content
            <div className="int-App">
                <div className="int-left-side">
                    <VideoChat></VideoChat>
                </div>
                <div className="int-divider"></div>
                <div className="int-right-side">
                    <Editor className="int-editor"></Editor>
                </div>
            </div> */}
        </div>

    );
}
export default InterviewPage;
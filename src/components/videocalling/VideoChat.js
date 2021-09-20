import './VideoChat.css';
import React, { useState, useEffect, useRef } from "react";
import Peer from 'peerjs';
import { Button, makeStyles } from '@material-ui/core';

let constraints = {
    video: true,
    audio: true
};

function VideoChat() {
    const videoRef = useRef(null);
    const remoteRef = useRef(null);
    const screenRef = useRef(null);

    const peerInstance = useRef(null);
    const peerInstanceScreen = useRef(null);

    const [userId, setUserId] = useState("");
    const [userScreenId, setUserScreenId] = useState("");
    const [peerScreen, setPeerScreen] = useState("");
    const [peerUser, setPeerUser] = useState("");
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState("");
    const [videoAccess, setVideoAccess] = useState(true);
    const [audioAccess, setAudioAccess] = useState(true);

    const toggleVideo = (b) => {
        console.log(b);
        if (b) {
            localStream.getVideoTracks()[0].enabled = true
        } else {
            localStream.getVideoTracks()[0].enabled = false
        }
        setVideoAccess(b);
    }

    const toggleAudio = (b) => {
        console.log(b);
        if (b) {
            localStream.getAudioTracks()[0].enabled = true
        } else {
            localStream.getAudioTracks()[0].enabled = false
        }
        setAudioAccess(b);
    }

    let uid = Math.floor(Math.random() * 100).toString();
    let uidScreen = Math.floor(Math.random() * 100).toString(); 
        
    useEffect(() => {
        
        // normal call
        const peer = new Peer(uid, {
            host: 'localhost',
            path: '/peerjs',
            // secure: true, 
            // secure should be false when we are running it on localhost
            // since localhost is not secure, only when we deploy, we turn it true
            port: 5000,
        });
        // console.log(peer);

        peer.on('open', (id) => {
            console.log("Id = " + id.toString());
            setUserId(id);
        })
        peerInstance.current = peer;

        peer.on('call', (call) => {

            navigator.getUserMedia(constraints, async (stream) => {
                let video = videoRef.current
                setLocalStream(stream)
                video.srcObject = stream;
                video.play();

                console.log("Someone is calling " + call);
                call.answer(stream)
                call.on('stream', (remoteStr) => {
                    console.log(remoteStr);
                    let remoteVideo = remoteRef.current;
                    setRemoteStream(remoteStr);
                    remoteVideo.srcObject = remoteStr;
                    remoteVideo.play();
                })

            })
        })


        // screen call
        const peer2 = new Peer(uidScreen, {
            host: 'localhost',
            path: '/peerjs',
            // secure: true, 
            // secure should be false when we are running it on localhost
            // since localhost is not secure, only when we deploy, we turn it true
            port: 5000,
        });
        console.log(peer2);

        peer2.on('open', (id) => {
            console.log("Id1 = " + id.toString());
            setUserScreenId(id);
        })
        peerInstanceScreen.current = peer2;

        peer2.on('call', (call) => {

            call.answer(null);
            call.on('stream', (remoteStr) => {
                console.log(remoteStr);
                let video = screenRef.current;
                setRemoteStream(remoteStr);
                video.srcObject = remoteStr;
                video.play();
            })

            call.on('close', () => {
                console.log("CLOSEDDDD!")
                let video = screenRef.current;
                video.pause();
            })

            // navigator.getUserMedia(constraints, async (stream) => {
            //     let video = videoRef.current
            //     setLocalStream(stream)
            //     video.srcObject = stream;
            //     video.play();

            //     console.log("Someone is calling " + call);
            //     call.answer(null)
            //     call.on('stream', (remoteStr) => {
            //         console.log(remoteStr);
            //         let remoteVideo = remoteRef.current;
            //         setRemoteStream(remoteStr);
            //         remoteVideo.srcObject = remoteStr;
            //         remoteVideo.play();
            //     })

            // })
        })

    }, []);

    const startCall = () => {
        navigator.getUserMedia(constraints, async (stream) => {

            let video = videoRef.current
            setLocalStream(stream)
            video.srcObject = stream;
            video.play();

            const call = peerInstance.current.call(peerUser, stream);
            call.on('stream', async (stream) => {
                let remoteVideo = remoteRef.current;
                setRemoteStream(stream);
                remoteVideo.srcObject = stream;
                remoteVideo.play();
            })
        })
    }

    const startScreenCall = () => {
        navigator.mediaDevices.getDisplayMedia(
            {video : {cursor : "always"}}
        ).then((stream) => {
            let video = screenRef.current
            // setLocalStream(stream)
            video.srcObject = stream;
            video.play();

            peerInstanceScreen.current.call(peerScreen, stream);
            // call.on('stream', async (stream1) => {
            //     let remoteVideo = remoteRef.current;
            //     // setRemoteStream(stream);
            //     remoteVideo.srcObject = stream1;
            //     remoteVideo.play();
            // })
        })
    }

    return (
        <div>
            <div className="container" >
                <video className="primary-video" autoPlay={true} id="local-video" ref={videoRef}></video>
                <video className="secondary-video" autoPlay={true} id="remote-video" ref={remoteRef}></video>
            </div>
            
            <video className="screen-video" autoPlay={true} id="screen-video" ref={screenRef}></video>

            <input
                className="input-id"
                placeholder="Enter Remote id"
                onChange={(e) => {
                    setPeerUser(e.target.value);
                    setPeerScreen(e.target.value);
                }}></input>
            <Button
                variant="contained"
                onClick={() => {
                    startCall()
                }}>Call</Button>
            <br />
            <Button
                variant="contained"
                onClick={() => {
                    startScreenCall()
                }}>Screen Share</Button>
            <br />
            <Button
                variant="contained"
                margin="10"
                onClick={() => {
                    toggleVideo(!videoAccess)
                }}>Toggle video</Button>

            <Button
                variant="contained"
                margin="10"
                onClick={() => {
                    toggleAudio(!audioAccess)
                }}>Toggle audio</Button>
        </div>

    );
}
export default VideoChat;
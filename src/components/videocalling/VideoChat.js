import './VideoChat.css';
import React, {useState, useEffect} from "react";
import Peer from 'peerjs';


function VideoChat() {

    const [userId, setUserId] = useState(null);
    const [peerUser, setPeerUser] = useState(null);
    const [localStream, setLocalStreeam] = useState("");
    const [remoteStream, setRemoteStream] = useState("");

    useEffect(() => {
        if(userId == null){
            return;
        }

        setPeerUser( new Peer(userId, {
            secure: true,
            host: '192.168.0.4',
            port: 5000,
            path: '/peerjs'
        }))
    }, [userId])


    return (
        <div class="container" >
            <video className="primary-video" autoPlay id="local-video"></video>
            <video className="secondary-video" autoPlay id="remote-video"></video>
            <button onClick={() => {
                setUserId(userId+"1");
                console.log(userId)
            }}>set id</button>
        </div>
    );
}
export default VideoChat;
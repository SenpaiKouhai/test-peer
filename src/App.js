import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Peer from 'peerjs';

function App() {
    const [ peer, setPeer ] = useState()
    const [ avail, setAvail ] = useState()
    const [ peerId, setPeerId ] = useState('')
    const [ call, setCall ] = useState('') 
    const [ chat, setChat ] = useState('')
    const [ file, setFile ] = useState()
    const [ receive, setReceive ] = useState()

    useEffect( () => {
        if(avail) {
            console.log(peer)
            console.log(avail)

            peer.on('connection', setAvail);

       
            avail.on('data', function(data) {
                // console.log('Received', data);
                // console.log('conn')
                setReceive(data)
            });
            
        }

    }, [peer, avail] )

    const handleSetId = () => {
        setPeer( new Peer(peerId))
    }

    const handleCall = e => {
        setAvail(peer.connect(call))
    }
    const handleChat = e => {
        avail.send({ from: peerId, msg: chat, img: file })
    }
    const handleFile = (e) => {
        const img = e.target.files[0];
        let reader = new FileReader()
        reader.onload = (e) => {
            setFile(e.target.result)
        }
        reader.readAsDataURL(img)
        // let blob = new Blob(img,{ type: img.type })
        // setFile(URL.createObjectURL(blob))
    }

    return (
        <div className="App">
            <h1>Peer js</h1>

            <input type="text" value={peerId} onChange={ e => setPeerId(e.target.value) } />
            <button onClick={handleSetId} >Set my id</button>

            <br />

            <input type="text" value={call} onChange={ e => setCall(e.target.value) } />
            <button onClick={handleCall} >Connect to </button>

            <br />
            <input type="text" value={chat} onChange={ e => setChat(e.target.value)} />
            <button onClick={handleChat} >chat</button>

            <br />

            <input type="file" onChange={handleFile} />
            <img src={file}  />

            <br />

            {receive && 
                <div>
                    <p>Sent By: {receive.from}</p>
                    <p>Msg: {receive.msg}</p>
                    <img src={receive.img} />
                </div>
            }
        </div>
    );
}

export default App;

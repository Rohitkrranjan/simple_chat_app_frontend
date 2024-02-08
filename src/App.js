import './App.css';
import {useEffect, useState} from 'react'
import io from 'socket.io-client'
import {nanoid} from 'nanoid'


const socket = io.connect("http://localhost:5000")
const useName = nanoid(5);

function App() {

  const [message,setMessage] = useState('');
 const [chat,setChat] = useState([]);
  const sendChat=(e)=>{
    e.preventDefault();
    socket.emit("chat",{message,useName })
    setMessage("")
  }

  useEffect(()=>{
      socket.on("chat",(payload)=>{
       setChat([...chat,payload])
      })
  },[])

  return (
    <div className="g-slate-900 grid place-content-center h-screen">
      <h1 className="text-red-800 font-extrabold text-4xl my-8 mx-16">Chat App </h1>
      {
        chat.map((payload,index)=>{
          return(
            <div>
            <span className="mx-5 bg-red-800 text-white">id:{payload.useName}</span>
            <p  key={index}>{payload.message}</p>

            </div>
            
          )
        })
      }
      <form onSubmit={sendChat}>
        <input className="text-xl font-bold border border-red-600 bg-amber-50 rounded-2xl h-[40px] w-[390px] text-center" type='text' name='chat' value={message} placeholder='send text' onChange={(e)=>setMessage(e.target.value)}/>
        <button type='submit' className="border-red-400 border mx-5 w-[85px] h-[35px] bg-red-500 text-white rounded-xl items-center justify-center">send</button>
      </form>
      
    </div>
  );
}

export default App;

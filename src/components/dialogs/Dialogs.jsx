
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const Dialogs = () => {

  const [wsChanel, setWsChanel] = useState(null)

  useEffect(()=> {
    let ws
    const closeHandler = () => {
      console.log('close ws')
        setTimeout(createChanel, 5000)
    }
    function createChanel(){
      
        ws?.removeEventListener('close', closeHandler)
        ws?.close()
      
       ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      ws?.addEventListener('close',closeHandler)
      setWsChanel(ws) 
    }
    createChanel();
    return () => {
      ws.removeEventListener('close',closeHandler)
      ws.close()
      console.log('close')
    }
  },[])

  const authMe = useSelector((state) => state.profile.login)

  let navigate = useNavigate();

  useEffect(() => {
    if (!authMe) {
      return navigate("/login");
    }
  }, [authMe, navigate]);

  useEffect (()=> {
    const messageHandler = (e) => {
      let newMessages = JSON.parse(e.data)
      setMessage((prevMessages) => [...prevMessages , ...newMessages])
    }
    wsChanel?.addEventListener('message', messageHandler)
    return ()=> {
      wsChanel?.removeEventListener('message', messageHandler)
    }
  }, [wsChanel])

 const [message, setMessage] = useState([])


  return (
    <div className="dialogs">
      <div  style={{height: '400px', overflowY: 'auto'}}>{message.map((m) => <Message wsChanel={wsChanel} key={nanoid()} message={m}/>)}</div>
    
    <AddMessageForm wsChanel={wsChanel}/>
    </div>
  )
}

const Message = ({message}) => {
return(
<>
<img style ={{width: '40px'}} src={message.photo} alt='img'/>
  <div >{message.userName}</div> <br />
  <div>{message.message}</div>
  </>
)
}

const AddMessageForm = (props) => {
  const [message, setMessage] = useState('')
  const [readyStatus, setReadyStatus] = useState(false)

  useEffect(()=> {
    const onHandler = () => {
      setReadyStatus(true)
    }
    props.wsChanel?.addEventListener('open',onHandler)
    return () => {
      props.wsChanel?.removeEventListener('open', onHandler)
    }
  },[props.wsChanel])
  const sendMessage = () => {
    if(!message){
      return
    }
    props.wsChanel?.send(message)
    setMessage('')
  }
  return (
    <div>
      <TextField style={{margin: '10px'}} onChange={(e)=> setMessage(e.currentTarget.value)} value={message} id="standard-basic" label="write your message" fullWidth />
      {/* <textarea onChange={(e)=> setMessage(e.currentTarget.value)} value={message} ></textarea> */}
      <Button  variant="outlined" disabled={!readyStatus} onClick={sendMessage}>send</Button>
    </div>
  )
}

export default Dialogs;

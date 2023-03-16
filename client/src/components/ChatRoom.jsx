import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

const ChatRoom = () => {

  const [messagesList,setMessagesList] = useState([])

  const [message,setMessage] = useState('')

  
  useEffect(() => {
    socket.on('message:server',(data)=>{
      setMessagesList([
        data,...messagesList
      ])   
    });

  }, [messagesList])
  

  function HandleChange (e) {
    setMessage(e.target.value)
  }

  function HandleSubmit (e){
    e.preventDefault()
    
    let newMessage= {
      body:message,
      id: 'me'
    }

    setMessagesList([
      newMessage,...messagesList
    ])
    socket.emit('message:client',message)
    setMessage('')

  }

  return (
    <div className='bg'>
      <form onSubmit={HandleSubmit} className='formulario'>
        <input className='formulario_input' type='text' value={message} onChange={HandleChange}></input>
        <button className='formulario_button' type='submit'>enviar</button>
      </form>
      <div className='mensajes'>
        {
          messagesList.map((item)=>
            <div className={item.id === 'me' ? 'mensaje__card__CTA' : 'mensaje__card'}>
              <span style={{fontWeight:'600',marginTop:'8px'}}>{item.id}</span>
              <p className='mensaje__card__body'>{item.body}</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ChatRoom
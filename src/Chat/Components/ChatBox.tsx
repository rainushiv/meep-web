import { useEffect, useRef } from "react";
import "./ChatBox.css"
export default function ChatBox(){
    const connection = useRef(null)

    useEffect(()=>{
const socket = new WebSocket("ws://localhost:4000/chat");

socket.addEventListener("open", event => {
    socket.send("Connection established")
 

    })
    socket.addEventListener("message", (event) => {
        console.log("Message from server ", event.data)
      })
  
 });
    return (
        <div className="chatbox-Container">

        </div>
    )
}
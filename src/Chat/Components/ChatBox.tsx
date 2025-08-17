import { FormEvent, useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import Avatar from "@mui/joy/Avatar";
import { da } from "zod/v4/locales";
import { Link, useParams } from "react-router-dom";
import { APIURL } from "../../App";

type message =   {
  userId: number;
  message: string;
};

export default function ChatBox() {
  const [currentUser, setCurrentUser] = useState<any>();
  const [sendUser, setSendUser] = useState<any>();
  const [text, setText] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [message, setMessage] = useState<message[]>([]);
  const Id = useStoreAuth((state) => state.Id);
  const username = useStoreAuth((state) => state.Username);
  const uid = useParams().uid;
  const socket = useRef<WebSocket | null>(null);
   useEffect(() => {
    async function getTopic() {
      const user1 = uid?.split(":")[0];
      const user2 = uid?.split(":")[1];
      const [id1, id2] = [user2, user1].sort();
      setTopic(`${id1}${id2}`);
    }
    getTopic();
  }, [uid]);

  useEffect(() => {
    const id = uid?.split(":")[0];
    async function getCurrentUser() {
      // const id = Id;
      // const url = `http://localhost:3000/api/users/${id}/getcurrentuser`
      const res = await fetch(`${APIURL}/api/users/${id}/getcurrentuser`);
      const data = await res.json();
      setCurrentUser(data.user[0]);
    }
    async function getSendUser() {
      // const id = Id;
      // const url = `http://localhost:3000/api/users/${id}/getcurrentuser`
      const res = await fetch(`${APIURL}/api/users/${Id}/getcurrentuser`);
      const data = await res.json();
      setSendUser(data.user[0]);
    }
    getSendUser();
    getCurrentUser();
  }, [uid]);
  async function getChat(topic:string){

    const res = await fetch(`${APIURL}/api/chat/getchat/${topic}`)
    const data = await res.json()

    data.chat.map((message:message)=>{
      setMessage((prev)=>[...prev,message])
    })


  }
  useEffect(() => {
    if (socket.current) {
      socket.current?.close();
      setMessage([]);
    }
    if (!topic){
      return
    }
    socket.current = new WebSocket("ws://localhost:3001/chat?topic=" + topic);

    socket.current.onopen = (event) => {

      getChat(topic)


      console.log("WebSocket client opened", event);
    };
    socket.current.onmessage = (event) => {
      setMessage((prev) => [
        ...prev,
        { userId: event.data.split(":")[0], message: event.data.split(":")[1] },
      ]);
    };
    socket.current.onclose = (event) => {
      console.log("Websocket client closed, event", event);
    };
  }, [uid,topic]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = { userId: Id, text: text };
    if (socket.current) {
     socket.current.send(JSON.stringify(data));
    
    try {

      const res = await fetch(`${APIURL}/api/chat/insertchat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          data,
        }),
      });
    } catch (err) {
      console.log(err);
    }


      setText("");
    } else {
      console.log("no socket connected");
    }
  }
  return (
    <div className="chatbox-Container">
      {currentUser && (
        <div className="recipentUser-Container">
          <Link
            to={`http://localhost:5173/otheruser/${currentUser.id}`}
            className="link-reset"
          >
            {" "}
            <div className="recipentUser-Content">
              <img src={currentUser.avatarUrl}></img>
              <h3>{currentUser.username}</h3>
            </div>
          </Link>
        </div>
      )}

      <hr className="chathr-Divider" />
      <div className="chatContent-Container">
        {message &&
          message.map((message) => (
            <ChatMessage
              userId={message.userId}
              message={message.message}
            ></ChatMessage>
          ))}
      </div>
      <div className="chatInput-Container">
        <form onSubmit={handleSubmit}>
          <input
            value={text}
            placeholder="Message..."
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></input>

          <button disabled={text === "" ? true : false}>Send</button>
        </form>
      </div>
    </div>
  );

  function ChatMessage(message: message) {
    const messageClass = +message.userId === Id ? "sent" : "received";
    return (
      <>
        <div className={`message-Container ${messageClass}`}>
          <Avatar
            src={
              messageClass === "sent"
                ? sendUser.avatarUrl
                : currentUser.avatarUrl
            }
          ></Avatar>
          <p className="itsykwim">{message.message}</p>
        </div>
      </>
    );
  }

  async function flushBuffer(topic: string) {
    
    try {

      const res = await fetch(`${APIURL}/api/chat/insertchat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
        }),
      });
    } catch (err) {
      console.log(err);
    }

  }
}

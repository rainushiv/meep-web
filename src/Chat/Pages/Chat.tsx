import Header from "../../Shared/Components/Header";
import ChatBox from "../Components/ChatBox";
import UsersChat from "../Components/UsersChat";
import  "./Chat.css"


export default function Chat(){

    return (

        <>
        <Header></Header>
        <div className="chat-Container">
        <UsersChat></UsersChat>
        <ChatBox></ChatBox>
 
        </div>
       </>
    )
}
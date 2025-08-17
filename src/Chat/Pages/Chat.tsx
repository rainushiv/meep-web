import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { z } from "zod";
import { hc } from "hono/client";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import { APIURL } from "../../App";
import { Link, useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/joy/IconButton";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import UsersChat from "../Components/UsersChat";
import "./Chat.css"
import ChatBox from "../Components/ChatBox";
import TempChatBox from "../Components/TempChatBox";

type message = {
  userId: string;
  text: string;
};

type follower = {
    id:number,
    name: String,
    username:String,
    avatarUrl:string


}
function App() {
  const [isLoading,setIsLoading]= useState(false)

const [followers,setFollowers] = useState<follower[]>([]);
const [selectedChat,setSelectedChat] = useState("")
  const Id = useStoreAuth((state) => state.Id);
  const navigate = useNavigate()


    const directory = useParams().uid;
 
    useEffect(()=>{
        async function getUserFollower(){
            setIsLoading(true)
            
const res = await fetch(`${APIURL}/api/users/getcurrentuserfollowing/${Id}`)
const data = await res.json()
setFollowers(data.following)
 
            setIsLoading(false)
        }
        getUserFollower()

   },[])
 return (
    <div className="chat-Container">
<div className="backButton2fa-Container">
            <div className="flexBackButton2fa-Container" onClick={()=>navigate("/home")}>
            <IconButton sx={[
                  {
                    "&:hover": {
                      color: "white",
                      backgroundColor: "transparent",
                    },
                  },
                ]}>
      <ArrowBackIosIcon className="goBack2fa-Button"></ArrowBackIosIcon>
            </IconButton>
 
            </div>

         </div>

        <hr className="chat-Divider"></hr>
         <div>

         </div>
         <div className="chatFollower-Container">
 {!isLoading && followers.map(followers =>{ return <Link to={`/chat/${followers.id}:${Id}`}> <UsersChat id={followers.id} name={followers.name} username={followers.username} avatarUrl={followers.avatarUrl}></UsersChat> </Link>})
}
         </div>
         <div className="chatFollower-Placeholder" >
            </div>

        <hr className="chat-Divider"></hr>
        {directory === "inbox" ? <TempChatBox/> : <ChatBox/>}
        
      
    </div>
  );
}

export default App;

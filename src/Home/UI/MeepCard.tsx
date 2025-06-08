import Avatar from "@mui/joy/Avatar";
import "./MeepCard.css";
import Divider from "@mui/joy/Divider";
import { useEffect, useState } from "react";
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import { APIURL } from "../../App";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface Props {
  id: number;
  body: string;
  imageUrl: string | null;
  creatorId: number;
  userMeep: boolean
}
type isLiked =  {
  userId: number
}
export default function MeepCard({ id, body, imageUrl, creatorId, userMeep }: Props) {
  const [currentUser, setCurrentUser] = useState<any>();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const Token = useStoreAuth((state) => state.Token);
  const userId = useStoreAuth((state) => state.Id);
  const naviate = useNavigate();
  useEffect(() => {
    async function getCurrentUser() {
      setIsLoading(true)
      // const id = Id;
      // const url = `http://localhost:3000/api/users/${id}/getcurrentuser`
      const res = await fetch(
        `${APIURL}/api/users/${creatorId}/getcurrentuser`
      );
      const data = await res.json();
      setCurrentUser(data.user[0]);

      setIsLoading(false)
    }
    getCurrentUser();
  }, []);

  useEffect(()=>{
async function checkLikeCount(){

  const res = await fetch(`${APIURL}/api/usermeeps/getmeeplikecount/${id}`)
  const data = await res.json()

  setLikeCount(data.result)

}
checkLikeCount()

  },[])

  useEffect(() => {
    async function checkLike() {
if(userId){
      const res = await fetch(
        `${APIURL}/api/usermeeps/checklike/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
        "Authorization":"Bearer "+Token
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );
      const data = await res.json();
      const liked:isLiked = data.isLiked[0];
      if(liked){
      if (liked.userId = id) {
        setIsLiked(true);
      }
      }
    }


}
    checkLike();
  }, [isLiked]);

  async function LikeHandler() {

if(userId){
    const res = await fetch(
      `${APIURL}/api/usermeeps/likemeep/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        "Authorization":"Bearer "+Token
        },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );
    setIsLiked(true);
    setLikeCount(likeCount+1)
  }
}

async function handleUserSelect(){

  naviate(`/otheruser/${currentUser.id}`)
  
}
  return (
    <>
    <Link to={`/meeps/${id}`}>
      <div className="meepfeed-Container">
<div className="meepContent-Container" onClick={(e)=>{
  e.preventDefault()
  e.stopPropagation()
  handleUserSelect()}}>
    <div className="meepuseravatar">
<Avatar 
              size="md"
              src={(currentUser && currentUser.avatarUrl) || ""}
            ></Avatar>
 
    </div>
 <div className="meepBody-Container">
          <div className="username-Container">
           
            {(!isLoading && currentUser) && <h4>{currentUser.name}</h4>}
            {(!isLoading && currentUser) && <p>{`@${currentUser.username}`}</p>} 
         </div>
          <p>{body}</p>
 
  </div>
 
</div>
      {imageUrl &&
<div className="meepImages-Container">
          <img className="meepImage" src={imageUrl}></img>
        </div>
 
        }
             </div>
      <div className="interact-Container"> 
            
           <div>
            {isLiked && (
              <IconButton
                variant="plain"
                color="danger"
                sx={[
                  {
                    "&:hover": {
                      color: "red",
                      backgroundColor: "transparent",
                    },
                  },
                ]}
                onClick={(e: React.MouseEvent<HTMLButtonElement> )=>{

                  e.preventDefault()
                  e.stopPropagation()}}
              >
                <Favorite></Favorite>
              <p>{likeCount}</p>
              </IconButton>
            )}

            {!isLiked && (
              <IconButton
                variant="plain"
                color="danger"
                sx={[
                  {
                    "&:hover": {
                      color: "red",
                      backgroundColor: "transparent",
                    },
                  },
                ]}
                onClick={(e)=>{

                  e.preventDefault()
                  e.stopPropagation()
                  LikeHandler()}}
              >
                <FavoriteBorder></FavoriteBorder>
              <p className="likeCount">{likeCount}</p>
              </IconButton>
            )}
          </div>
          <IconButton>

            <ChatBubbleOutlineOutlinedIcon></ChatBubbleOutlineOutlinedIcon>
          </IconButton>
      </div>
</Link>
<hr className="horizontal-Divider"></hr>
    </>
  );
}

import { useEffect, useState } from "react"
import "./CommentPost.css"
import IconButton from "@mui/joy/IconButton";

import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { APIURL } from "../../App";
import Avatar from "@mui/joy/Avatar";
import Divider from "@mui/joy/Divider";
import { useStoreAuth } from "../../Auth/Components/AuthStore";

import Favorite from "@mui/icons-material/Favorite";
type props ={
    id: number,
    body: string,
    creatorId: number,
    imageUrl: string | null,


}

export default function CommentPost({ id,body,creatorId,imageUrl}:props){
const [meepCommentUser,setMeepCommentUser] = useState<any>();
const [isLoading,setIsLoading] = useState(false);
const [isLiked, setIsLiked] = useState(false);

  const Id = useStoreAuth((state) => state.Id);
 useEffect(()=>{
  async function checkCommentLike(){
const result = await fetch(`${APIURL}/api/usermeeps/checklikecomment/${id}`,{
  method:"POST",
  headers:{"Content-Type": "application/json"},
  body: JSON.stringify({userId: Id})
})
const data = await result.json()

  if(data.data[0].userId === Id){
setIsLiked(true)
  }
  }
checkCommentLike();
 },[])

async function likeCommentHandler(){

  const result = await fetch(`${APIURL}/api/usermeeps/likecomment/${id}`,{
method:"POST",
headers:{"Content-Type": "application/json",},
body: JSON.stringify({userId:Id})
  })
  const data = await result.json()
  console.log(data)
  setIsLiked(true)

}


useEffect(()=>{
    async function getUser(){
setIsLoading(true);
const result = await fetch(`${APIURL}/api/users/${creatorId}/getcurrentuser`);

const data = await result.json();
setMeepCommentUser(data.user[0])
setIsLoading(false)
    }
getUser();
},[])

    return (
<>
 <div className="meepComment-Container">
<div className="meepCommentContent-Container">
<Avatar
              size="md"
              src={(meepCommentUser && meepCommentUser.avatarUrl) || ""}
            ></Avatar>
  <div className="meepCommentBody-Container">
          <div className="username-Container">
           
            {(!isLoading && meepCommentUser) && <h4>{meepCommentUser.name}</h4>}
            {(!isLoading && meepCommentUser) && <p>{`@${meepCommentUser.username}`}</p>} 
         </div>
          <p>{body}</p>
 
  </div>
 
</div>
      {imageUrl &&
<div className="meepCommentImages-Container">
          <img className="meepCommentImage" src={imageUrl}></img>
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
                  likeCommentHandler()}}
              >
                <FavoriteBorder></FavoriteBorder>
              </IconButton>
            )}
          </div>
      </div> 
      <Divider></Divider>
</>
    )
}
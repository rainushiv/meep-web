import { useParams } from "react-router-dom";
import "./MeepPost.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import Avatar from "@mui/joy/Avatar";
import { APIURL } from "../../App";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import AttachmentIcon from "@mui/icons-material/Attachment";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import MeepContent from "../../Home/Components/MeepContent";
import CommentPost from "./CommentPost";

type meepComments = {
    comments:comment[]
}
type comment = {
id:number,
imageText:string,
imageUrl: string,
body: string,
creatorId:number,
meepId:number

}

export default function MeepPost() {
  const [title, setTitle] = useState("");
  const [meep, setMeep] = useState<any>();
  const [currentUser, setCurrentUser] = useState<any>();
  const [meepUser,setMeepUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>();
  const [subject, setSubject] = useState("");
  const [isValid, setIsValid] = useState<Boolean>();
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null
  );
const [likeCount,setLikeCount] = useState(0)
const [meepComments, setMeepComments] = useState<meepComments>()
const [isLiked, setIsLiked] = useState(false)   
  const uid = useParams();
  const Id = useStoreAuth((state) => state.Id);
  const Token = useStoreAuth((state) => state.Token);
  const userId = useStoreAuth((state) => state.Id);
  useEffect(() => {
    async function getmeep() {
      setIsLoading(true);
      const result = await fetch(
        `${APIURL}/api/usermeeps/getmeep/${uid.uid}`
      );
      const data = await result.json();
      setMeep(data.usermeeps[0]);
      setIsLoading(false);

      console.log(meep)
    }
    getmeep();
  }, []);

  useEffect(()=>{
async function checkLikeCount(){

  const res = await fetch(`${APIURL}/api/usermeeps/getmeeplikecount/${uid.uid}`)
  const data = await res.json()

  setLikeCount(data.result)

}
checkLikeCount()

  },[])
  useEffect(() => {
    async function getCurrentUser() {
      setIsLoading(true);
      // const id = Id;
      // const url = `http://localhost:3000/api/users/${id}/getcurrentuser`
      const res = await fetch(
        `${APIURL}/api/users/${Id}/getcurrentuser`
      );
      const data = await res.json();
      setCurrentUser(data.user[0]);
      setIsLoading(false);
    }
    getCurrentUser();
  }, [meep]);
  useEffect(() => {
    async function getMeepUser() {
      setIsLoading(true);
      // const id = Id;
      // const url = `http://localhost:3000/api/users/${id}/getcurrentuser`
      const res = await fetch(
        `${APIURL}/api/users/${meep.creatorId}/getcurrentuser`
      );
      const data = await res.json();
      setMeepUser(data.user[0]);
      setIsLoading(false);
    }
    getMeepUser();
  }, [meep]);

  useEffect(() => {
    async function checkLike() {
if(userId){
      const res = await fetch(
        `${APIURL}/api/usermeeps/checklike/${uid.uid}`,
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
      const liked = data.isLiked[0];
      if(liked){
      if (liked.userId = userId) {
        setIsLiked(true);
      }
      }
    }


}
    checkLike();
  }, []);

  async function LikeHandler() {

if(userId){
    const res = await fetch(
      `${APIURL}/api/usermeeps/likemeep/${uid.uid}`,
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
    setLikeCount(likeCount +1)
  }
}



  const filePicker = useRef<HTMLInputElement>(null);

  const pickImageHandler = () => {
    if (filePicker.current) {
      filePicker.current.click();
    }
  };
  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    if (!file) {
      return;
    } else {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  useEffect(()=>{

  },[])

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const id = Id?.toString();
    if (!file && id) {
      try {
        const formData = new FormData();
        formData.append("body", subject);
        formData.append("creatorId", id);
        formData.append("meepId",uid.uid?.toString()!)
        const res = await fetch(`${APIURL}/api/usermeeps/createcomment`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + Token,
          },
        });


        setTitle("");
        setSubject("");
      } catch (err) {
        console.log(err);
        console.log("hello");
      }
    } else if (file && id) {
      const formData = new FormData();
      formData.append("body", subject);
      formData.append("creatorId", id);
      formData.append("image", file);
      formData.append("meepId",uid.uid?.toString()!)
      try {
        const res = await fetch(`${APIURL}/api/usermeeps/createcomment`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + Token,
          },
        });

        setTitle("");
        setSubject("");
        setFile(null);
        setPreviewUrl(null);
      } catch (err) {
        console.log(err);
      }
    }
  };
useEffect(()=>{
        async function getComment(){

const result = await fetch(`${APIURL}/api/usermeeps/getmeepcomments/${uid.uid}`)
const data = await result.json()
setMeepComments(data)
        }
        getComment();  
    },[meep])

 const content = meepComments?.comments.map((comment)=>{
    return(
<div>
    <CommentPost id={comment.id} body={comment.body} creatorId={comment.creatorId} imageUrl={comment.imageUrl}></CommentPost>
</div>
    )
},[meep])

  return (

    <div className="meepPostPage-Container">
      <div className="meepfeed-Container">
        <div className="meepPostContent-Container">

          {meepUser && !isLoading ? (
            <Avatar size="md" src={meepUser.avatarUrl}></Avatar>
          ) : (
            <Avatar size="md" src=""></Avatar>
          )}
          <div className="meepBody-Container">
            <div className="username-Container">
              {meepUser && <h4>{meepUser.name}</h4>}
              {meepUser && <p>{`@${meepUser.username}`}</p>}
            </div>

        </div>

          </div>
          <div className="meepPostBody-Container">

            {!isLoading && meep && <p>{meep.body} </p>}
          </div>

        {!isLoading && meep ? (
          <div className="meepPostImage-Container">
            
            {meep.imageText !== "N/A" && <img className="meepPostImage" src={meep.imageUrl || null}></img>}
          </div>
        ) : (
          <div>
            <h3>LOADING</h3>
          </div>
        )}
        <div>
          <hr className="divider"></hr>
          <div className="meepPostAction-Button">
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
          <hr className="divider"></hr>
        </div>
        <div>
          <div className="meepPostComment-Container">
            <Avatar src={currentUser && currentUser.avatarUrl}></Avatar>

            <div>
              <textarea
                className="commentInputArea"
                value={subject}
                placeholder="What's on your mind?"
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              ></textarea>
              {typeof previewUrl === "string" && (
                <div className="homeMeepPreview-Container">
                  <IconButton
                    className="test"
                    style={{ backgroundColor: "transparent" }}
                    onClick={() => {
                      setFile(null);
                      setPreviewUrl(null);
                    }}
                  >
                    <CloseOutlinedIcon className="unpickfile-Button"></CloseOutlinedIcon>
                  </IconButton>
                  <img src={previewUrl} className="meepImg-Container"></img>
                </div>
              )}
              <div className="meepCommentButtons-Container">
                <div className="attachmentButton-Container">
                  <IconButton
                    className="attachment-Container"
                    onClick={pickImageHandler}
                  >
                    <AttachmentIcon className="attachment-Button"></AttachmentIcon>
                  </IconButton>

                  <input
                    type="file"
                    ref={filePicker}
                    style={{ display: "none" }}
                    accept=".jpg,.png,.jpeg"
                    onChange={pickedHandler}
                  ></input>
                  <IconButton>
                    <GifBoxOutlinedIcon className="attachment-Button" />
                  </IconButton>
                </div>
                <button
                  className="meep-button"
                  type="submit"
                  onClick={submitHandler}
                >
                 Reply 
                </button>
              </div>
<hr className="horizontal-Divider"></hr>
            </div>

          </div>
        </div>

<div>

    { meepComments&& content}
</div>
      </div>

    </div>
  );
}

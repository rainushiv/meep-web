import Divider from "@mui/joy/Divider"
import "./SideBarContent.css"
import { useInfiniteQuery } from "@tanstack/react-query";
import HomeUserCard from "./HomeUserCard";
import { useEffect, useRef, useState } from "react";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import { Link, useAsyncError } from "react-router-dom";
import { APIURL } from "../../App";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CloseIcon from "@mui/icons-material/Close";
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import Avatar from "@mui/joy/Avatar";
export default function SideBarContent(){
  const [currentUser, setCurrentUser] = useState<any>();
  const [isOpenFollower, setIsOpenFollower] = useState(false);
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState<boolean>();
  const [file, setFile] = useState<File>();
  const [isOpen, setIsOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null | ArrayBuffer>(
    null
  );

    const Logout = useStoreAuth((state) => state.Logout);
  const Id = useStoreAuth((state) => state.Id);
  const Token = useStoreAuth((state) => state.Token);


  useEffect(()=>{
if(isOpenFollower){
  document.body.style.overflow= "hidden"
}
else{

  document.body.style.overflow= "scroll"

}
  },[isOpenFollower])
  useEffect(() => {
    async function getCurrentUser() {
      // const id = Id;
      // const url = `http://localhost:3000/api/users/${id}/getcurrentuser`
      const res = await fetch(`${APIURL}/api/users/${Id}/getcurrentuser`);
      const data = await res.json();
      setCurrentUser(data.user[0]);
    }
    getCurrentUser();
  }, []);

  const meepSubmitHandler = async () => {
    if (!file)
      try {

            const formData = new FormData()
            formData.append("body",value)
            formData.append("creatorId",Id!.toString())
        const res = await fetch(`${APIURL}/api/usermeeps/createimgmeep`, {
          method: "POST",
          headers: {
            "Authorization":"Bearer "+Token
          },
          body: formData,
        });

        setValue("");
        setPreviewUrl(null);
      } catch (err) {
        console.log(err);
      }
    else if (file && value && Id) {
      const formData = new FormData();
      formData.append("body", value);
      formData.append("creatorId", Id.toString());
      formData.append("image", file);
      try {
        const res = await fetch(`${APIURL}/api/usermeeps/createimgmeep`, {
          method: "POST",
          body: formData,
          headers:{
            "Authorization":"Bearer "+Token
          }
        });
        setValue("");
        setPreviewUrl(null);
      } catch (err) {
        console.log(err);
      }
    }
  };

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

  function openProfileHandler(){
    setIsOpen(!isOpen)
  }


    return(
<>
<div className="sideBar-Content">
    <nav className="navlist">
        <Link className="navbarLink" to={"/home"}> 
        <h1>Meep</h1>
        </Link>
        <ul className="navContent">
<Link className="navbarLink" to={"/"}>

            <li>Home</li>
</Link>
<Link className="navbarLink" to={"/"}>

            <li>Explore</li>
</Link>
<Link className="navbarLink" to={"/notification"}>

            <li>Notifications</li>
</Link>
<Link className="navbarLink" to={"/chat/inbox"}>

            <li>Messages</li>
</Link>
<Link className="navbarLink" to={"/profile"}>
<li>Profile</li>
</Link>

        </ul>

    </nav>
          {isOpenFollower && (
            <div className="darkBG">
              <div className="centered">
                <div className="modal">
                  <div className="modalHeader">
                    <div className="heading">
                      <p>Meep</p>
                      <IconButton
                        onClick={() => {
                          setIsOpenFollower(false);
                        }}
                      >
                        <CloseIcon></CloseIcon>
                      </IconButton>
                    </div>
                  </div>
                  <textarea
                    placeholder="whats on your mind..."
                    className="meep-Input"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  ></textarea>
                  {  previewUrl && (
                    <img src={previewUrl} className="meepImg-Container"></img>
                  )}
                  <div className="meepbutton-Container">
                    <div className="sidebarActionButton-Container">
                        
                    <IconButton  onClick={pickImageHandler}>
                      <AttachmentIcon className='attachment-Button'></AttachmentIcon>
                    </IconButton>
 <IconButton>
    <GifBoxOutlinedIcon className='attachment-Button'/>
 </IconButton>
 
                    </div>

                    <input
                      type="file"
                      ref={filePicker}
                      style={{ display: "none" }}
                      accept=".jpg,.png,.jpeg"
                      onChange={pickedHandler}
                    ></input>
                    <Button
                      className="postSubmit-Button"
                      onClick={() => {
                        meepSubmitHandler(), setIsOpenFollower(false);
                      }}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
    <button className="sideBarPost-Button"
onClick={() => {
              setIsOpenFollower(true);
            }}
    >Post</button>
    {isOpen && <div className="popUp-Banner">
        <div className="logout-Container" onClick={()=>Logout()}>
            <h3>Logout</h3>
        </div> 
        </div>
        }
<div className="userProfile-Banner" onClick={openProfileHandler}>
    <Avatar src={ currentUser &&currentUser.avatarUrl}></Avatar>
    <div className="userProfileBanner-Info">
<h3>{currentUser && currentUser.name}</h3>
<p>{currentUser && `@${currentUser.username}`}</p>
    </div>

</div>
</div>

</>
    )

}
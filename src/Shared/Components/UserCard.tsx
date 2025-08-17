import { useEffect, useRef, useState } from "react";
import { APIURL } from "../../App";
import "./UserCard.css";
import Avatar from "@mui/joy/Avatar";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/joy/IconButton";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CloseIcon from "@mui/icons-material/Close";
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import { Link, useNavigate } from "react-router-dom";
type props = {
  id: number;
  isUser: boolean;
};

export default function UserCard({ id, isUser }: props) {

  const currentuserId = useStoreAuth((state) => state.Id);
  const [currentUser, setCurrentUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
const [isBannerChange, setIsBannerChange]= useState(false)
const [followerCount,setFollowerCount] = useState<number>()
const [followingCount,setFollowingCount] = useState<number>()
  const [isOpenModal,setIsOpenModal] = useState(false)
const [file, setFile] = useState<File>();
const[isValid, setIsValid] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null | ArrayBuffer>(
    null
  );

  const Id = useStoreAuth((state) => state.Id);
const navigate = useNavigate()
  useEffect(()=>{
if(isOpenModal){
  document.body.style.overflow= "hidden"
}
else{

  document.body.style.overflow= "scroll"

}
  },[isOpenModal])

  useEffect(()=>{
    async function getFollowing(){

const res = await fetch(`${APIURL}/api/users/followingcount/${id}`)
const data = await res.json()

console.log(data.result)

setFollowingCount(data.result)
    }
    getFollowing()
  },[id])

  useEffect(()=>{

    async function getFollowers(){
const res = await fetch(`${APIURL}/api/users/followercount/${id}`)
const data = await res.json()
console.log(data.result)
setFollowerCount(data.result)
}
getFollowers()
  },[id])



  useEffect(()=>{

    async function checkfollowing() {
      const res = await fetch(`${APIURL}/api/users/checkfollowing/${id}`, {
        method:"POST",
        headers:{"Content-Type": "application/json"},

      body:JSON.stringify({profileId: currentuserId})
      })
const data = await res.json();

      const follower = data.following[0];
      console.log(follower)
      if (follower === undefined || follower.length === 0) {
        setIsFollowing(false);
      } else if (follower !== 0) {
        setIsFollowing(true);
      }
    }
if(!isUser){

    checkfollowing();
}

  },[id])
  

  useEffect(() => {
    async function getCurrentUser() {
      setIsLoading(true);
      const res = await fetch(`${APIURL}/api/users/${id}/getcurrentuser`);
      const data = await res.json();
      console.log(data.user[0])
      setCurrentUser(data.user[0]);

      setIsLoading(false);
    }
    getCurrentUser();
  }, [id]);

  async function changeAvatar(){
    const formData = new FormData();
    formData.append("avatar",file!)
    formData.append("id",id.toString())
    const res = await fetch(`${APIURL}/api/users/updateuseravatar`,{
      method:'POST',
        body: formData
    })

    setFile(undefined)
    setPreviewUrl(null)
    setIsOpenModal(false)
  }
async function changeBanner(){
    const formData = new FormData();
    formData.append("banner",file!)
    formData.append("id",id.toString())
    const res = await fetch(`${APIURL}/api/users/updateuserbanner`,{
      method:'POST',
        body: formData
    })

    setIsOpenModal(false)
    setFile(undefined)
    setPreviewUrl(null)
    setIsBannerChange(false)
  }
  const filePicker = useRef<HTMLInputElement>(null);

  const pickImageHandler = () => {
    if (filePicker.current) {
      filePicker.current.click();
    }
    else{
    }
  };
  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);

      setIsOpenModal(true)
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


  async function followUserHandler() {
    try {
      console.log(Id, id);
      const res = await fetch(`${APIURL}/api/users/follow/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: Id,
        }),
      });

      console.log(res);
      setIsFollowing(true);
    } catch (err) {
      console.log("error while following");
    }
  }
  return (
    <div className="profileUser-Container">
      <div className="userProfileContent-Container">
        <img src={(currentUser && !isLoading)? currentUser.bannerUrl:""} className="banner"></img>
        <div className="userProfileInfo-Container">
          <div className="profileAvatar-Container">
            <img
              className="profileAvatar-Image"
              src={currentUser && !isLoading && currentUser.avatarUrl}
            ></img>
          </div>
          <div className="profileTextSpace-Container">
            <div>
              <h3>{currentUser && currentUser.name}</h3>
              <p>{currentUser && `@${currentUser.username}`}</p>
              <div className="userFollowers-Container">
                <div className="userFollowers">

                <Link className="link-reset" to={`/userFollower/${id}`}>
                <p className="Followers-Text">{`Followers`}</p>

</Link>
                <p className="Followers-Number">{`${followerCount}`}</p>
                </div>
                <div className="userFollowing">

                <Link to={`/userFollowing/${id}`} className="link-reset">
                <p className="Following-Text" >{`Following`}</p>

</Link>
                <p className="Following-Number">{`${followingCount}`}</p>
                </div>

              </div>
            </div>
            {isUser && (
              <div>
              { isOpen && <div className="userPopUp-Banner">
                <div className="changeBanner-Container" onClick={()=>{
                  setIsBannerChange(true)
                  pickImageHandler()
                 } } ><h3>Change Banner</h3></div>
                
                <hr className="ProfileHorizontal-Divider"/>
                <div className="changeAvatar-Container"onClick={pickImageHandler}><h3>Change Avatar</h3></div>
                <hr className="ProfileHorizontal-Divider"/>
                <div className="changeAvatar-Container"onClick={()=>navigate("/authEnable2fa")}><h3>Enable 2FA</h3></div>
              </div>}

                    <input
                      type="file"
                      ref={filePicker}
                      style={{ display: "none" }}
                      accept=".jpg,.png,.jpeg"
                      onChange={pickedHandler}
                    ></input>
{ isOpenModal &&
            <div className="darkBG">
              <div className="centered">
                <div className="modalProfile">
                  <div className="modalHeaderProfile">
                    <div className="heading">
                      <p>Meep</p>
                      <IconButton
                        onClick={() => {
                          
                          setIsOpenModal(false)

                        }}
                      >
                        <CloseIcon></CloseIcon>
                      </IconButton>
                    </div>
                  </div>
                  
                  {  previewUrl && (
                    <img src={previewUrl} className="meepImg-Container"></img>
                  )}
                  <div className="meepbutton-Container">
                    <div className="sidebarActionButton-Container">

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
                      onClick={()=>{
                        if(isBannerChange){

                        changeBanner()
                        }
                        else{
                          changeAvatar()
                        }

                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
}

              <div>
                <IconButton
                onClick={()=>{setIsOpen(!isOpen)}}
                  sx={[
                    {
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    },
                  ]}
                >
                  <MoreVertIcon
                    sx={{ fontSize: 28, color: "white" }}
                  ></MoreVertIcon>
                </IconButton>
              </div>

              </div>
            )}
            {!isUser && (
              <div className="FollowButton-Container">
                {isFollowing ? <Button>Following</Button>: <Button onClick={followUserHandler}>Follow</Button>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

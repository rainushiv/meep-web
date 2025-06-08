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
type props = {
  Id: number;
  isUser: boolean;
};

export default function UserCard({ Id, isUser }: props) {
  const [currentUser, setCurrentUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
const [isBannerChange, setIsBannerChange]= useState(false)
  const [isOpenModal,setIsOpenModal] = useState(false)
const [file, setFile] = useState<File>();
const[isValid, setIsValid] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null | ArrayBuffer>(
    null
  );

  useEffect(()=>{
if(isOpenModal){
  document.body.style.overflow= "hidden"
}
else{

  document.body.style.overflow= "scroll"

}
  },[isOpenModal])
  useEffect(() => {
    async function getCurrentUser() {
      setIsLoading(true);
      const res = await fetch(`${APIURL}/api/users/${Id}/getcurrentuser`);
      const data = await res.json();
      setCurrentUser(data.user[0]);

      setIsLoading(false);
    }
    getCurrentUser();
  }, [Id]);

  async function changeAvatar(){
    const formData = new FormData();
    formData.append("avatar",file!)
    formData.append("id",Id.toString())
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
    formData.append("id",Id.toString())
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
            </div>
            {isUser && (
              <div>
              { isOpen && <div className="userPopUp-Banner">
                <div className="changeBanner-Container" onClick={()=>{
                  setIsBannerChange(true)
                  pickImageHandler()
                 } } ><h3>Change Banner</h3></div>
                
                <hr className="horizontal-Divider"/>
                <div className="changeAvatar-Container"onClick={pickImageHandler}><h3>Change Avatar</h3></div>
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
                <Button>Follow</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

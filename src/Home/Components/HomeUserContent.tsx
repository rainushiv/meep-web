import { useEffect, useState, useRef } from "react";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CloseIcon from "@mui/icons-material/Close";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import "./HomeUserContent.css";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import { APIURL } from "../../App";
export default function HomeUserContent() {
  const [currentUser, setCurrentUser] = useState<any>();
  const [isOpenFollower, setIsOpenFollower] = useState(false);
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState<boolean>();
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | null | ArrayBuffer>(
    null
  );
  const Id = useStoreAuth((state) => state.Id);
  const Token = useStoreAuth((state) => state.Token);

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
        const res = await fetch(`${APIURL}/api/usermeeps/createmeep`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+Token
          },
          body: JSON.stringify({
            title: null,
            body: value,
            creatorId: Id,
          }),
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

  return (
    <div className="home-Container">
      <div className="image-Container">
        <img
          className="profile-background"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEV/AP/V1f06AAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII="
        ></img>

        <img
          className="Homeavatarprofile-Container"
          src={currentUser && currentUser.avatarUrl}
        ></img>
      </div>
      <div className="userProfile-Container">
        <div>
          <h1>{currentUser && currentUser.name}</h1>
          <h3>{currentUser && `@${currentUser.username}`}</h3>
        </div>
        <div>
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
                  <div></div>
                  <div className="meepbutton-Container">
                    <IconButton  onClick={pickImageHandler}>
                      <AttachmentIcon></AttachmentIcon>
                    </IconButton>

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
          <Button
            onClick={() => {
              setIsOpenFollower(true);
            }}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

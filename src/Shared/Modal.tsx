import IconButton from "@mui/joy/IconButton";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CloseIcon from "@mui/icons-material/Close";
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import Button from "@mui/joy/Button";
type props = {
    isOpen: boolean
}

export default function Modal({isOpen}:props){
const [file, setFile] = useState<File>()
const [isValid,setIsValid]=useState(false)
const [previewUrl,setPreviewUrl]= useState<string | null | ArrayBuffer>()
const [isOpenModal,setIsOpenModal]= useState(false)

useEffect(()=>{
    
})

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


    return(
        <>
{(isOpen && isOpenModal) &&
            <div className="darkBG">
              <div className="centered">
                <div className="modal">
                  <div className="modalHeader">
                    <div className="heading">
                      <p>Meep</p>
                      <IconButton
                        onClick={() => {

                        isOpen = false 

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
                      }}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
}

        </>
    )
}
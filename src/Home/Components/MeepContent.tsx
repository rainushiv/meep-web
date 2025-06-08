import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import { FormEvent, useEffect, useState } from 'react';
import { useStoreAuth } from '../../Auth/Components/AuthStore';
import { useRef } from 'react';
import "./MeepContent.css"
import { APIURL } from '../../App';
import IconButton from '@mui/joy/IconButton';
import AttachmentIcon from "@mui/icons-material/Attachment";
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Avatar from '@mui/joy/Avatar';
export default function MeepContent() {
    const [title, setTitle] = useState('')
    const [subject, setSubject] = useState('')
    const [currentUser,setCurrentUser] = useState<any>()
    const [file, setFile] = useState<File | null>()
    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer|null>(null)
    const [isValid, setIsValid] = useState<Boolean>()
    const Id = useStoreAuth((state) => state.Id)
    const Token = useStoreAuth((state) => state.Token)


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

    const submitHandler = async (event: FormEvent) => {

        event.preventDefault();
        const id = Id?.toString()
        if(!file && id ){
        try {

            const formData = new FormData()
            formData.append("body",subject)
            formData.append("creatorId",id)
            const res = await fetch(`${APIURL}/api/usermeeps/createimgmeep`, {
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': 'Bearer '+Token,
                },
            })

            setTitle('')
            setSubject('')
        } catch (err) {
            console.log(err)
            console.log("hello")
        }
 
        }else if(file && id){
            const formData = new FormData()
            formData.append("body", subject)
            formData.append("creatorId",id )
            formData.append("image",file )
            try {
             const res = await fetch(`${APIURL}/api/usermeeps/createimgmeep`, {
                method: "POST",
                body:formData, 
                headers:{
        "Authorization":"Bearer "+Token
                }
            })   

            setTitle('')
            setSubject('')
            setFile(null)
            setPreviewUrl(null)
            }catch(err){
                console.log(err)
            }
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


    return (
        <div className='meepPost-Container'>
<Avatar src={currentUser&& currentUser.avatarUrl}></Avatar>
 
 <div >

                <textarea className='inputArea' value={subject} placeholder="What's on your mind?" onChange={(e) => { setSubject(e.target.value) }}></textarea>
{  typeof previewUrl ==='string' && (
    <div className='homeMeepPreview-Container'> 
    <IconButton className='test' style={{backgroundColor:"transparent"}} onClick={()=>{setFile(null); setPreviewUrl(null)}}>
<CloseOutlinedIcon className='unpickfile-Button'></CloseOutlinedIcon>
    </IconButton>
                    <img src={previewUrl} className="meepImg-Container"></img>
    
    </div>
                 )}
<div className='meepAction-Container'>

    <div className='attachmentButton-Container'>

<IconButton className='attachment-Container' onClick={pickImageHandler}>
                      <AttachmentIcon className='attachment-Button'></AttachmentIcon>
                    </IconButton>

                    <input
                      type="file"
                      ref={filePicker}
                      style={{ display: "none" }}
                      accept=".jpg,.png,.jpeg,.gif"
                      onChange={pickedHandler}
                    ></input>
 <IconButton onClick={pickImageHandler}>
    <GifBoxOutlinedIcon className='attachment-Button'/>

 </IconButton>

                    <input
                      type="file"
                      ref={filePicker}
                      style={{ display: "none" }}
                      accept=".jpg,.png,.jpeg.gif"
                      onChange={pickedHandler}
                    ></input>
    </div>
               <button className='meep-button' type='submit' onClick={submitHandler}>Post</button>


</div>



 </div>
        </div>
    )
}
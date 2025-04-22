import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import { FormEvent, useEffect, useState } from 'react';
import { useStoreAuth } from '../../Auth/Components/AuthStore';
import { useRef } from 'react';
import "./MeepContent.css"
import { APIURL } from '../../App';

export default function MeepContent() {
    const Id = useStoreAuth((state) => state.Id)
    const [title, setTitle] = useState('')
    const [subject, setSubject] = useState('')
    const [file, setFile] = useState<File>()
    const [previewUrl, setPreviewUrl] = useState<string |null | ArrayBuffer>(null)
    const [isValid, setIsValid] = useState<Boolean>()

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        console.log(title, subject)
        const id = Id?.toString()
        if(!file){
        try {
            const res = await fetch('api/usermeeps/createmeep', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    title: null,
                    body: subject,
                    creatorId: Id
                })
            })

            setTitle('')
            setSubject('')
        } catch (err) {
            console.log(err)
        }
 
        }else if(file && id){
            const formData = new FormData()
            formData.append("body", subject)
            formData.append("creatorId",id )
            formData.append("image",file )
            try {
             const res = await fetch(`${APIURL}/api/usermeeps/createimgmeep`, {
                method: "POST",
                body:formData 
            })   
            setTitle('')
            setSubject('')
            setPreviewUrl(null)
            }catch(err){
                console.log(err)
            }
        }

   }



    const filePicker = useRef<HTMLInputElement>(null);

  const pickImageHandler =() =>{
    if(filePicker.current){

    filePicker.current.click()
    }}
const pickedHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
let pickedFile
    if(event.target.files && event.target.files.length === 1){
        pickedFile = event.target.files[0]
        setFile(pickedFile)
        setIsValid(true)
    }else{
        setIsValid(false)
    }


    }

    useEffect(()=>{

        if(!file){
            return
        }else{
            const fileReader = new FileReader();

            fileReader.onload= ()=>{
                setPreviewUrl(fileReader.result)
            };
            fileReader.readAsDataURL(file);
        }

    },[file])
    return (
        <div className='meep-Container'>
            <form onSubmit={submitHandler}>

                <div className='file-container'>
                  {typeof previewUrl ==='string' ?  <img src={previewUrl} alt='preview'></img> : 

                <button className='upload-button' type='button' onClick={pickImageHandler}>upload</button>
                  }  

                <input type='file' ref={filePicker} style={{display:'none'}} accept='.jpg,.png,.jpeg' onChange={pickedHandler}></input>
                </div>


                <input className='inputArea' value={subject} placeholder='Whats on your mind...' onChange={(e) => { setSubject(e.target.value) }}></input>

                <button className='meep-button' type='submit'>Submit</button>

            </form>
        </div>
    )
}
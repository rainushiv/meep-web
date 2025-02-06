import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import { FormEvent, useState } from 'react';
import { useStoreAuth } from '../../Auth/Components/AuthStore';
import "./MeepContent.css"



export default function MeepContent() {
    const Id = useStoreAuth((state) => state.Id)
    const [title, setTitle] = useState('')
    const [subject, setSubject] = useState('')

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        console.log(title, subject)
        try {
            const res = await fetch('api/usermeeps/createmeep', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    title: title,
                    body: subject,
                    creatorId: Id
                })
            })

            setTitle('')
            setSubject('')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='meep-Container'>
            <form onSubmit={submitHandler}>
                <div className='title-Container'>

                    <Input placeholder='Title' value={title} onChange={(e) => { setTitle(e.target.value) }}></Input>
                </div>
                <div className='input-Container'>

                    <Textarea className='textArea' minRows={4} value={subject} placeholder='Subject' onChange={(e) => { setSubject(e.target.value) }}></Textarea>

                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>

            </form>
        </div>
    )
}
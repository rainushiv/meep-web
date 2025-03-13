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
    }
    return (
        <div className='meep-Container'>
            <form onSubmit={submitHandler}>


                <input className='inputArea' value={subject} placeholder='Whats on your mind...' onChange={(e) => { setSubject(e.target.value) }}></input>

                <button className='meep-button' type='submit'>Submit</button>

            </form>
        </div>
    )
}
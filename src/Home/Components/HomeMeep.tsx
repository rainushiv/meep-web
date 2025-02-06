import Divider from '@mui/joy/Divider/Divider'
import Avatar from '@mui/joy/Avatar/Avatar'
import { useEffect, useState } from 'react'
import './HomeMeep.css'
type meep = {
    title: String,
    body: String,
    creatorId: number,
}
export default function HomeMeep({ title, body, creatorId }: meep) {

    const [username, setUsername] = useState()
    const [name, setName] = useState()
    useEffect(() => {
        async function getMeepUser() {

            try {
                const res = await fetch(`api/users/${creatorId}/getcurrentuser`)
                const data = await res.json()
                setUsername(data.user[0].username)
                setName(data.user[0].name)


            }
            catch (err) {
                console.log(err)
            }
        }
        getMeepUser()
    }, [])

    return (
        <>
            <div className="usermeep-Container">
                <div className='title-container'>
                    <Avatar size='sm' />
                    <h3 className='title'>{name}</h3>
                </div>
                <div>
                </div>
                <div className='body-container'>

                    <p>{body}</p>
                </div>
            </div>

            <Divider></Divider>


        </>
    )
}
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import "./HomeUserCard.css"
import { useStoreAuth } from '../../Auth/Components/AuthStore';
import { APIURL } from '../../App';
import Divider from '@mui/joy/Divider';

type userlist = {
    user: user[]
}

type user = {
    id: number,
    name: String,
    username: String
    avatarUrl:string


}

export default function HomeUserCard({ id, name, username,avatarUrl }: user) {

const [isFollowing,setIsFollowing] = useState<Boolean>(false);
  const Id = useStoreAuth((state) => state.Id);


    useEffect(() => {

        async function getIfFollowing() {
            const res = await fetch(`${APIURL}/api/users/checkfollowing/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    profileId: Id
                })
            })
            const data = await res.json()

            const follower = data.following[0]
            if (follower === undefined || follower.length === 0) {
                setIsFollowing(false)
            }
            else if (follower !== 0) {
                setIsFollowing(true)
            }
            console.log(isFollowing)
        }
        getIfFollowing()
    }, [])


        async function followUserHandler() {

        try {

console.log(Id,id)
            const res = await fetch(`${APIURL}/api/users/follow/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    profileId: Id
                })
            })

console.log(res)
            setIsFollowing(true)
        } catch (err) {
            console.log("error while following")
        }
    }


    return (
        <>
        <div className='homeUserCard-Container' >

            <div className='cardcontent-Container'>
            <div className='cardinfo-Container'>
                <Avatar src={avatarUrl}></Avatar>

          <Link to={`/otheruser/${id}`}>
            <div>
                <Typography level="title-lg">{name}</Typography>
                <Typography level="body-sm">@{username}</Typography>
               
            </div>
            </Link>
 
            </div>
           <div>
                     <Button 
                        variant="solid"
                        size="md"
                        color="primary"
                        aria-label="Explore Bahamas Islands"
                        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600,marginTop:2 }}
                        onClick={followUserHandler}
                    >
                       {isFollowing ?"Following": "Follow" }
                    </Button>


            </div>
 
            </div>
               
        </div>

        <Divider></Divider>

        </>
    );
}
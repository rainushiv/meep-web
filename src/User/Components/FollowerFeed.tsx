import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { APIURL } from "../../App";
import HomeUserCard from "../../Home/Components/HomeUserCard";
type props = {
    Id: number
}
type followers = {
    followers: follower[]
}
type follower = {
    id:number,
    name: String,
    username:String,
    avatarUrl:string


}
export default function FollowerFeed(){
    const [followers,setFollowers] = useState<followers>();

  const uid = useParams();
console.log(uid.uid)
    useEffect(()=>{
        async function getUserFollower(){
const res = await fetch(`${APIURL}/api/users/getcurrentuserfollowers/${uid.uid}`)
const data = await res.json()
console.log(data.followers)
setFollowers(data)
 
        }
        getUserFollower()
   },[uid])

    const content = followers?.followers!.map(followers =>{ return <HomeUserCard id={followers.id} name={followers.name} username={followers.username} avatarUrl={followers.avatarUrl}></HomeUserCard>})
    return( <>
{content}
    </>
    )
}
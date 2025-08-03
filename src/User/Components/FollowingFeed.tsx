import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { APIURL } from "../../App";
import HomeUserCard from "../../Home/Components/HomeUserCard";
type props = {
    Id: number
}
type followings = {
    following: following[]
}
type following = {
    id:number,
    name: String,
    username:String,
    avatarUrl:string


}
export default function FollowingFeed(){
    const [following,setFollowing] = useState<followings>();

  const uid = useParams();
console.log(uid.uid)
    useEffect(()=>{
        async function getUserFollower(){
const res = await fetch(`${APIURL}/api/users/getcurrentuserfollowing/${uid.uid}`)
const data = await res.json()
console.log(data.following)
setFollowing(data)
 
        }
        getUserFollower()
   },[uid])

    const content = following?.following!.map(following =>{ return <HomeUserCard id={following.id} name={following.name} username={following.username} avatarUrl={following.avatarUrl}></HomeUserCard>})
    return( <>
{content}
    </>
    )
}
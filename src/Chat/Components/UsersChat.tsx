
import { useEffect, useState } from "react";
import "./UsersChat.css"
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import HomeUserCard from "../../Home/Components/HomeUserCard";
type user = {
  id: number;
  name: String;
  username: String;
  email: String;
  password: String;
  avatarUrl:string;
};


type users = {
  following: user[];
};
export default function UsersChat(){

const Id = useStoreAuth((state) => state.Id);
const [followedusers, setFollowedUsers] = useState<users>()

     useEffect(()=>{

        async function getUserFollowing(){

         const res = await fetch(`http://localhost:5173/api/users/${Id}/getcurrentuserfollowing`)
         const data =await  res.json()
         console.log(data.following)

         setFollowedUsers(data)

        }
        getUserFollowing()
         

     },[])

const content = followedusers?.following.map((user:user)=>{

    return (
        <div>
            <HomeUserCard
            id={user.id}
            username={user.username}
            name={user.name}
            avatarUrl={user.avatarUrl}
            
            >

            </HomeUserCard>
        </div>
    )
})
    return(

        <div className="user-Container">
            {content}
        </div>
    )

}
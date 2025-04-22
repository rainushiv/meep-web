import Divider from "@mui/joy/Divider"
import "./SideBarContent.css"
import { useInfiniteQuery } from "@tanstack/react-query";
import HomeUserCard from "./HomeUserCard";
import { useEffect, useState } from "react";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import { useAsyncError } from "react-router-dom";
import { APIURL } from "../../App";
interface Name{
    name:String
}
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


export default function SideBarContent({name}:Name){


const Id = useStoreAuth((state) => state.Id);
const [followedusers, setFollowedUsers] = useState<users>()

     useEffect(()=>{

        async function getUserFollowing(){

         const res = await fetch(`${APIURL}/api/users/${Id}/getcurrentuserfollowing`)
         const data =await  res.json()
         console.log("RUNNON")

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


//   const content = data?.pages.map((users: users) =>
//     users.users.map((user) => {
//       return (
//         <div>
//           <HomeUserCard
//             id={user.id}
//             name={user.name}
//             username={user.username}
//           ></HomeUserCard>
//         </div>
//       );
//     })
//   );

    return(
<div className="sideBar-Content">
    <h3>{name}</h3>
<Divider></Divider>
{content}
</div>

    )

}
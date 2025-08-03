import { useEffect, useState } from "react";
import { APIURL } from "../../App";
import "./SearchUserCard.css"



export default function SearchUserCard(userId:any){
    const [isLoading,setIsLoading] = useState(false)
    const [currentUser,setCurrentUser] = useState<any>()

  useEffect(() => {
    async function getCurrentUser() {
      setIsLoading(true);
      const res = await fetch(`${APIURL}/api/users/${userId.userId}/getcurrentuser`);
      const data = await res.json();
      setCurrentUser(data.user[0]);
      console.log(currentUser)
    
      setIsLoading(false);
    }
    getCurrentUser();
  }, [userId.userId]);
  

    return(
        <div className="userSearch-Container">


        <img src={currentUser && currentUser.avatarUrl} alt="" />
        <div className="userSearchText-Container">

        <p className="userSearch-Name">{currentUser && currentUser.name}</p>
        <p className="userSearch-Username">@{currentUser && currentUser.username}</p>


        </div>
        </div>
    )
}
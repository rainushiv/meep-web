import Divider from "@mui/joy/Divider";
import "./Notification.css"
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import { useEffect, useState } from "react";
import { APIURL } from "../../App";
import { Link } from "react-router-dom";
type notification = {
  id: number;
  senduser: number;
  recieveuser: number;
  action: string;
};
type user = {
    id:number ,
    name: string,
    username: string,
}

type notifications = {
    notification: notification,
    users: user
};
type notificationResult = {
    notifications: notifications[]


}


export default function NotificationBar(){
const [ notifications, setNotifications] = useState<notificationResult>();
          const Id = useStoreAuth((state) => state.Id);
          
               useEffect(()=>{
          
                  async function getUserFollowing(){
          
                   const res = await fetch(`${APIURL}/api/users/usernotifications/${Id}`)
                   const data =await  res.json()
                   console.log(data)
          
                   setNotifications(data)
          
                  }
                  getUserFollowing()
                   
          
               },[])
          
          const content = notifications?.notifications.map((data:notifications)=>{
          if(data.notification.action === "liked"){
              return (
<>
<Link to={`/otheruser/${data.users.id}`}>
                  <div className="notification-Container" key={data.notification.id}>
                    
                    {`${data.users.username} ${data.notification.action} your meep`}

                  </div>
</Link>

<hr className="horizontal-Divider"/>
 </>
              )
          }else{
            return(
<>

<Link to={`/otheruser/${data.users.id}`}>
                  <div className="notification-Container" key={data.notification.id}>

                    {`${data.users.username} ${data.notification.action} you`}
                  </div>

</Link>
<hr className="horizontal-Divider"/>
 
</>
           )
          }
         })
          

    return (
       <div className="notiBar-Content">
    <h3>Notification</h3>
<hr className="horizontal-Divider"></hr>
{content}
</div>


    )

}
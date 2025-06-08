import Header from "../../Shared/Components/Header";
import MeepContent from "../Components/MeepContent";
import Divider from "@mui/joy/Divider";
import "./Home.css";
import HomeUserContent from "../Components/HomeUserContent";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import { PageStore } from "../../Shared/Components/PageStore";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import HomeUserCard from "../Components/HomeUserCard";
import Button from "@mui/joy/Button";
import { useInView } from "react-intersection-observer";
import SideBarContent from "../Components/SideBarContent";
import RecBar from "../Components/RecBar";
import HomeUserFeed from "../Components/HomeUserFeed";
import NotificationBar from "../Components/NotificationBar";
import { Link, useParams } from "react-router-dom";
import { APIURL } from "../../App";

type user = {
  id: number;
  name: String;
  username: String;
  email: String;
  password: String;
  avatarUrl:string;
};

type users = {
  users: user[];
};


export default function Home() {
  const [userData, setUserData] = useState<any>(null);
  const [users, setUser] = useState<any>(null);
  const [meeps, setMeeps] = useState();

  const Id = useStoreAuth((state) => state.Id);
  const getUsers = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch(`${APIURL}/api/users/getusers?page=${pageParam}`);
    return await response.json();
  };
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    },
  });
  const content = data?.pages.map((users: users) =>
    users.users.map((user) => {
      if(user.id != Id){
return (
        <div>
      <HomeUserCard
          key={user.id}
            id={user.id}
            name={user.name}
            username={user.username}
            avatarUrl={user.avatarUrl}
          ></HomeUserCard>
        
         </div>
      )
      }
      ;
    })
  );

//   const { ref, inView } = useInView();

//   useEffect(() => {
    
//     if (inView && hasNextPage) {
//       fetchNextPage();
//     }
//  }, [fetchNextPage, inView]);

 useEffect(()=>{

    async function getFollowing(){
const res = await fetch(`${APIURL}/api/users/${Id}/getcurrentuserfollowing`)
const data =res.json()

console.log(data)

    }
 },[])

      //<Header />
  return (
      <div className="AllContent-Container">

          <SideBarContent></SideBarContent>
        <div className="sideBar-Placeholder">

        </div>
        <hr className="divider"></hr>

        <div className="homemeep-Container">
        <MeepContent></MeepContent>
          <HomeUserFeed></HomeUserFeed>
        </div>
 
        <hr className="divider"></hr>

          <RecBar content={content}></RecBar>
      </div>
  );
  /* <ul className='user-list'>

            {content}

            <div ref={ref} className='ref-div'></div>
</ul>
} */
}

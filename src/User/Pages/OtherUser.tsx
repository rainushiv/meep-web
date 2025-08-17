
import { useNavigate, useParams } from "react-router-dom"
import Header from "../../Shared/Components/Header"
import UserContent from "../Components/UserContent";
import { useEffect, useState } from "react";
import NotificationBar from "../../Home/Components/NotificationBar";
import SideBarContent from "../../Home/Components/SideBarContent";
import RecBar from "../../Home/Components/RecBar";
import { useInfiniteQuery } from "@tanstack/react-query";
import HomeUserCard from "../../Home/Components/HomeUserCard";
import { useInView } from "react-intersection-observer";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import UserFeed from "../Components/UserFeed";
import { APIURL } from "../../App";
import UserCard from "../../Shared/Components/UserCard";
import IconButton from "@mui/joy/IconButton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
type propid = {

    propId: string;

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
  users: user[];
};
export default function OtherUser() {
 const [userData, setUserData] = useState<any>(null);
  const [users, setUser] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState<Boolean>(false);
  const [meeps, setMeeps] = useState();
  const Id = useStoreAuth((state) => state.Id);

  const navigate = useNavigate();
    const userid = useParams().uid;
    const userId = +userid!;
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
      );
    })
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    async function getIfFollowing() {

      const res = await fetch(`${APIURL}/api/users/checkfollowing/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: Id,
        }),
      });
      const data = await res.json();

      const follower = data.following[0];
      if (follower === undefined || follower.length === 0) {
        setIsFollowing(false);
      } else if (follower !== 0) {
        setIsFollowing(true);
      }
    }
    getIfFollowing();
  },[]);


  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
 }, [fetchNextPage, inView]);

 useEffect(()=>{

    async function getFollowing(){
const res = await fetch(`${APIURL}/api/users/${Id}/getcurrentuserfollowing`)
const data =res.json()

console.log(data)

    }
 },[userid])
  





          //<HomeUserFeed></HomeUserFeed>
    return (
        <div className="AllContent-Container">

          <SideBarContent></SideBarContent>
        <div className="sideBar-Placeholder">

        </div>
        <hr className="divider"></hr>

        <div className="homemeep-Container">
<div className="backButton-Container">
            <div className="flexBackButton-Container" onClick={()=>navigate(-1)}>
            <IconButton sx={[
                  {
                    "&:hover": {
                      color: "white",
                      backgroundColor: "transparent",
                    },
                  },
                ]}>
      <ArrowBackIosIcon className="goBack-Button"></ArrowBackIosIcon>
            </IconButton>
           <h3>back</h3> 
 
            </div>
         </div>
 
           <UserCard id={userId} isUser={false}></UserCard>
            <UserFeed Id={userId}></UserFeed>

      </div>
      <hr className="divider"/>
        <div>
          <RecBar content={content}></RecBar>
        </div>
      </div>
    )
}
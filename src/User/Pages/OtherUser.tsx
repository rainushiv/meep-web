
import { useParams } from "react-router-dom"
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
 },[])



    const userid = useParams().uid;

          //<HomeUserFeed></HomeUserFeed>
    return (
        <>
      <Header />
      <div className="AllContent-Container">
        <div className="Side-Bar">
            <NotificationBar></NotificationBar>

          <SideBarContent name="following"></SideBarContent>
        </div>
        <div className="homemeep-Container">

          { userid && <UserContent Id={userid}></UserContent>}
        {userid && <UserFeed Id={userid}></UserFeed>}
        </div>

        <div>
          <RecBar content={content}></RecBar>
        </div>
      </div>
    </>)
}
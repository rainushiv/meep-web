import { useInfiniteQuery } from "@tanstack/react-query";
import RecBar from "../../Home/Components/RecBar"
import SideBarContent from "../../Home/Components/SideBarContent"
import "./NotificationPage.css"
import HomeUserCard from "../../Home/Components/HomeUserCard";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import { APIURL } from "../../App";
import NotificationBar from "../../Home/Components/NotificationBar";
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



export default function NotificationPage(){

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


    return (
    <div className="AllContent-Container">

          <SideBarContent></SideBarContent>
        <div className="sideBar-Placeholder">

        </div>
        <hr className="divider"></hr>

        <div className="homemeep-Container">
        <NotificationBar></NotificationBar>
        </div>
 
        <hr className="divider"></hr>

        <div>
          <RecBar content={content}></RecBar>
        </div>
      </div>
    )
}
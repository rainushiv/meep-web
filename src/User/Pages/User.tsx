
import { useInfiniteQuery } from "@tanstack/react-query"
import { APIURL } from "../../App"
import { useStoreAuth } from "../../Auth/Components/AuthStore"
import RecBar from "../../Home/Components/RecBar"
import SideBarContent from "../../Home/Components/SideBarContent"
import Header from "../../Shared/Components/Header"
import UserCard from "../../Shared/Components/UserCard"
import UserContent from "../Components/UserContent"
import HomeUserCard from "../../Home/Components/HomeUserCard"
import UserFeed from "../Components/UserFeed"
import { useNavigate } from "react-router-dom"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from "@mui/joy/IconButton";

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



export default function User() {
    const Id = useStoreAuth((state) => state.Id)

  const navigate = useNavigate();

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
            <UserCard Id={Id!} isUser={true}></UserCard>
            <hr className="horizontal-Divider"></hr>
            <UserFeed Id={Id!}></UserFeed>
        </div>
 
<hr className="divider"/>
        <div>
          <RecBar content={content}></RecBar>
        </div>
      </div>
    )
}
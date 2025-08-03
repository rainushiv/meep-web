import IconButton from "@mui/joy/IconButton";
import SideBarContent from "../../Home/Components/SideBarContent";
import UserCard from "../../Shared/Components/UserCard";
import UserFeed from "../Components/UserFeed";
import RecBar from "../../Home/Components/RecBar";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { APIURL } from "../../App";
import { useInfiniteQuery } from "@tanstack/react-query";
import HomeUserCard from "../../Home/Components/HomeUserCard";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "../Pages/UserFollower.css"
import FollowerFeed from "../Components/FollowerFeed";
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



export default function UserFollower() {
 const Id = useStoreAuth((state) => state.Id)

  const uid = useParams();
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


    return(
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
         <div className="followingList-Button">

    <Link to={`/userFollowing/${uid.uid}`}>
         <button autoFocus>follower</button>
</Link>

    <Link to={`/userFollower/${uid.uid}`}>
         <button>following</button>
</Link>

         </div>
         <div>
            <FollowerFeed></FollowerFeed>

         </div>
       </div>
 
<hr className="divider"/>
        <div>
          <RecBar content={content}></RecBar>
        </div>
      </div>
    )


}
import { useEffect, useState } from "react";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import MapUserMeeps from "./MapUserMeeps";
import './UserContent.css'
import FollowCard from "./FollowCard";
import Avatar from "@mui/joy/Avatar/Avatar";
import { Link } from "react-router-dom";
import Divider from "@mui/joy/Divider/Divider";
import MapFollow from "./MapFollow";
import MapFollowing from "./MapFollowing";
import Button from '@mui/joy/Button';
import FollowButton from "./FollowButton";
import UserMeeps from "./UserMeeps";
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from "react-intersection-observer";
import Meeps from "../../Meeps/Pages/Meeps";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import {colors, createTheme,hexToRgb,rgbToHex,ThemeProvider} from '@mui/material'
import { grey } from "@mui/material/colors";


type propId = {


    propId: string | undefined;
    followState: boolean;
}
type meeps = {
        usermeeps: meep[]
    }
 type meep = {
        id: number,
        name: string,
        body: string
    }
export default function UserContent({ propId }: propId) {

    const [isOpenFollower, setIsOpenFollower] = useState(false);
    const [isOpenFollowing, setIsOpenFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);    
    const [currentUser, setCurrentUser] = useState<any>()
    const [userMeeps, setUserMeeps] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [currentUserFollowers, setCurrentUserFollowers] = useState();
    const [currentUserFollowing, setCurrentUserFollowing] = useState();
    const Id = useStoreAuth((state) => state.Id)


    const currentId = propId ? propId : Id

    console.log(currentId)
    useEffect(() => {

        async function getCurrentUser() {

            // const id = Id;
            // const url = `http://localhost:3000/api/users/${id}/getcurrentuser`
            const res = await fetch(`http://localhost:5173/api/users/${currentId}/getcurrentuser`)
            const data = await res.json()

            setCurrentUser(data.user[0])


        }
        getCurrentUser()
    }, [])

    useEffect(() => {

        async function getCurrentUserMeeps() {
            setIsLoading(true);
            const res = await fetch(`http://localhost:5173/api/usermeeps/getusermeeps/${currentId}`)
            const data = await res.json()


            setUserMeeps( data.usermeeps)
            console.log(userMeeps)
        }
        getCurrentUserMeeps()
    }, [])

    const getMeeps = async({pageParam}:{pageParam:Number})=>{
        const response = await fetch (`http://localhost:5173/api/usermeeps/getusermeeps/${currentId}?page=${pageParam}`)
        return await response.json()
    }

    
    const {data, fetchNextPage  } = useInfiniteQuery({
        queryKey: ["meeps"],
        queryFn: getMeeps ,
        initialPageParam: 1,
        getNextPageParam:(lastPage, allPages) =>{
            return allPages.length+1
        }

    })    

    
const content = data?.pages.map((meeps:meeps)=> meeps.usermeeps.map((meeps)=> { return <div><UserMeeps id={meeps.id} name={meeps.name} body={meeps.body} ></UserMeeps></div>}))
    console.log(content?.length)

    const {ref,inView} = useInView()

    useEffect(()=>{
if(inView){
    fetchNextPage()
}

    },[fetchNextPage,inView])

    useEffect(() => {

        async function getCurrentUserFollowers() {
            const res = await fetch(`http://localhost:5173/api/users/${currentId}/getcurrentuserfollowers`)
            const data = await res.json()
            setCurrentUserFollowers(data.followers)
        }
        getCurrentUserFollowers()

        console.log(currentUserFollowers)
    }, [])
    useEffect(() => {

        async function getCurrentUserFollowing() {
            const res = await fetch(`http://localhost:5173/api/users/${currentId}/getcurrentuserfollowing`)
            const data = await res.json()


            setCurrentUserFollowing(data.following)
        }
        getCurrentUserFollowing()

    }, [])


    return (

        <div className="userContent-Container">
            <div>

                <Avatar></Avatar>
                <div className="name-Container">

                    {currentUser && currentUser.name}
                </div>

                <div className="username-Container">
                    {currentUser && currentUser.username}

                </div>
                <button onClick={() => { setIsOpenFollower(true) }}>Followers</button>
                <button onClick={() => { setIsOpenFollowing(true) }}>Following</button>

                {!(propId === "") && <FollowButton currentId={currentId}></FollowButton>}

            </div>

            {
                isOpenFollower &&
                <div className="darkBG" onClick={() => { setIsOpenFollower(false) }}>
                    <div className="centered">
                        <div className="modal">
                            <div className="modalHeader">
                                <div className="heading">
                                    <div>Followers</div>
                                    <Divider></Divider>
                                </div>
                            </div>
                            {currentUserFollowers && <MapFollow follows={currentUserFollowers}></MapFollow>}
                        </div>
                    </div>

                </div>
            }
            {
                isOpenFollowing &&
                <div className="darkBG" onClick={() => { setIsOpenFollowing(false) }}>
                    <div className="centered">

                        <div className="modal">
                            <div className="modalHeader">
                                <div className="heading">
                                    <div>Following</div>
                                    <Divider></Divider>
                                </div>
                            </div>
                            {currentUserFollowing && <MapFollowing follows={currentUserFollowing}></MapFollowing>}
                        </div>
                    </div>
                </div>
            }
<div>
         <button> meep feed</button>

         <button> meep feed</button>
 </div>
          <div  className="test">
                <ul>

        {content ? content: <p>no meeps</p>}

                </ul>
            </div>
        </div>
    )

                    //{userMeeps && <MapUserMeeps propId={propId} meeps={userMeeps}></MapUserMeeps>}
}
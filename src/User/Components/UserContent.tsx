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


type propId = {


    propId: string | undefined;
    followState: boolean;
}

export default function UserContent({ propId }: propId) {

    const [isOpenFollower, setIsOpenFollower] = useState(false);
    const [isOpenFollowing, setIsOpenFollowing] = useState(false);

    type meeps = {
        Meeps: meep[]
    }
    type meep = {

        name: string,
        body: string
    }
    const [currentUser, setCurrentUser] = useState<any>()
    const [userMeeps, setUserMeeps] = useState();
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
            const res = await fetch(`http://localhost:5173/api/usermeeps/getusermeeps/${currentId}`)
            const data = await res.json()


            setUserMeeps(data.usermeeps)
            console.log(userMeeps)
        }
        getCurrentUserMeeps()
    }, [])
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
                <ul>


                    {userMeeps && <MapUserMeeps meeps={userMeeps}></MapUserMeeps>}
                </ul>
            </div>
        </div>
    )

}
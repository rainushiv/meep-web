import Button from "@mui/joy/Button/Button";
import { useState, useEffect } from "react";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import "./FollowButton.css"
import { APIURL } from "../../App";
type followingInfo = {

    currentId: string | number | null,
    isfollowing: Boolean

}


export default function FollowButton({ currentId }: followingInfo) {

    const Id = useStoreAuth((state) => state.Id)

    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {

        async function getIfFollowing() {

            const res = await fetch(`${APIURL}/api/users/checkfollowing/${currentId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    profileId: Id
                })
            })
            const data = await res.json()

            const follower = data.following[0]
            if (follower === undefined || follower.length === 0) {
                setIsFollowing(false)
            }
            else if (follower !== 0) {
                setIsFollowing(true)
            }
            console.log(isFollowing)
        }
        getIfFollowing()
    }, [])
    async function followUserHandler() {

        try {

            const res = await fetch(`${APIURL}/api/users/follow/${currentId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    profileId: Id
                })
            })


            setIsFollowing(true)
        } catch (err) {
            console.log("error while following")
        }
    }


    return (
        <>
            {isFollowing ? <Button className="follow-button">following</Button> : <Button className="follow-button" onClick={followUserHandler}>follow</Button>}


        </>
    )
}
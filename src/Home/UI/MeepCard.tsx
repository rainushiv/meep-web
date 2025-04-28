import Avatar from "@mui/joy/Avatar";
import "./MeepCard.css";
import Divider from "@mui/joy/Divider";
import { useEffect, useState } from "react";
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import { APIURL } from "../../App";
interface Props {
  id: number;
  body: string;
  imageUrl: string | null;
  creatorId: number;
  userMeep: boolean
}
type isLiked =  {
  userId: number
}
export default function MeepCard({ id, body, imageUrl, creatorId, userMeep }: Props) {
  const [currentUser, setCurrentUser] = useState<any>();
  const [isLiked, setIsLiked] = useState(false);

  const userId = useStoreAuth((state) => state.Id);
  useEffect(() => {
    async function getCurrentUser() {
      // const id = Id;
      // const url = `http://localhost:3000/api/users/${id}/getcurrentuser`
      const res = await fetch(
        `${APIURL}/api/users/${creatorId}/getcurrentuser`
      );
      const data = await res.json();
      setCurrentUser(data.user[0]);
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    async function checkLike() {
if(userId){
      const res = await fetch(
        `${APIURL}/api/usermeeps/checklike/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );
      const data = await res.json();
      const liked:isLiked = data.isLiked[0];
      if(liked){
      if (liked.userId = id) {
        setIsLiked(true);
      }
      }
    }


}
    checkLike();
  }, []);

  async function LikeHandler() {

if(userId){
    const res = await fetch(
      `${APIURL}/api/usermeeps/likemeep/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );
    setIsLiked(true);
  }
}
  const liked = {};

  return (
    <>
      <div className="meepfeed-Container">
        <div className="userinfo-Container">
          <div className="username-Container">
            <Avatar
              size="lg"
              src={(currentUser && currentUser.avatarUrl) || ""}
            ></Avatar>

            {currentUser && <h4>{currentUser.name}</h4>}
            {currentUser && <h5>{`@${currentUser.username}`}</h5>}
          </div>
          { !userMeep && <div>
            {isLiked && (
              <IconButton
                variant="plain"
                color="danger"
                sx={[
                  {
                    "&:hover": {
                      color: "red",
                      backgroundColor: "transparent",
                    },
                  },
                ]}
              >
                <Favorite></Favorite>
              </IconButton>
            )}

            {!isLiked && (
              <IconButton
                variant="plain"
                color="danger"
                sx={[
                  {
                    "&:hover": {
                      color: "red",
                      backgroundColor: "transparent",
                    },
                  },
                ]}
                onClick={LikeHandler}
              >
                <FavoriteBorder></FavoriteBorder>
              </IconButton>
            )}
          </div>}
        </div>
        <div className="meepcontent-Container">
          <p>{body}</p>
        </div>
        <div className="meepImages-Container">
          {imageUrl && <img className="meepImage" src={imageUrl}></img>}
        </div>
      </div>

      <Divider></Divider>
    </>
  );
}

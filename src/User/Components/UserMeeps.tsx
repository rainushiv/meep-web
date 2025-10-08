import Button from "@mui/joy/Button";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import { useState, useEffect } from "react";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import { APIURL } from "../../App";

type meeps = {
  id: number;

  name: String;
  body: String;
};

type meepType = {
  propId: string | undefined;
  typeMeep: "Profile" | "Feed";
};

export default function UserMeeps(
  { id, name, body }: meeps,
) {
  const userId = useStoreAuth((state) => state.Id);
  const [isLiked, setIsLiked] = useState(false);
  const [isUserMeep, setIsUserMeep] = useState(true);

  useEffect(() => {
    async function checkLike() {
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
      const liked = data.isLiked[0];
      if ((liked.userId = id)) {
        setIsLiked(true);
      }
    }

    checkLike();
  }, []);

  async function LikeHandler() {
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

  return (
    <div className="usermeep-Container">
      <div className="title-container">
        <h3 className="title">{name}</h3>
      </div>
      <div className="body-container">
        <p>{body}</p>
        {  <div>
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
          </div>
}
      </div>
    </div>
  );
}

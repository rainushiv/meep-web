import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./UsersChat.css"
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import { APIURL } from "../../App";
import Divider from "@mui/joy/Divider";

type userlist = {
  user: user[];
};

type user = {
  id: number;
  name: String;
  username: String;
  avatarUrl: string;
};

export default function UsersChat({ id, name, username, avatarUrl }: user) {
      const [IsActive, setActive] = useState(false);

  return (
    <>
      <div className="chatUserCard-Container" onClick={()=>{setActive(true)}}>
        <div className="chatUserCardContent-Container">
          <div className="chatUserInfo-Container">
            <Avatar src={avatarUrl}></Avatar>
              <div className="testing-something">
                <Typography className="test-something" level="title-lg">{name}</Typography>
                <Typography level="body-sm">@{username}</Typography>
              </div>
          </div>
        </div>
      </div>

    </>
  );
}


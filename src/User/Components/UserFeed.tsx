import { useEffect, useState } from "react";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import Divider from "@mui/joy/Divider";
import MeepCard from "../../Home/UI/MeepCard";
import { APIURL } from "../../App";
import "./UserFeed.css"

type meep = {
  id: number;
  body: string;
  creatorId: number;
  imageUrl:string;
};
type props = {
    Id:number 
}
export default function UserFeed({Id}:props) {
  const [userFeed, setUserFeed] = useState();
  const [content, setContent] = useState();
  const [isLoading,setIsLoading] = useState(true);

  async function getFeed() {
    const response = await fetch(`${APIURL}/api/usermeeps/usermeepfeed/${Id}`);
    const data = await response.json();
    const content = data.usermeepfeed.map((usermeep: meep) => {
      return (
        <MeepCard
          key={usermeep.id}
          id={usermeep.id}
          body={usermeep.body}
          creatorId={usermeep.creatorId}
          imageUrl={null}
          userMeep={false}
        ></MeepCard>
      );
    });

    setContent(content);
  }

  async function getUserMeeps() {
    setIsLoading(true)

    const response = await fetch(`${APIURL}/api/usermeeps/getusermeeps/${Id}?page=1`);
    const data = await response.json();

    const content = data.usermeeps.map((usermeep: meep) => {
      return (
        <MeepCard
          id={usermeep.id}
          body={usermeep.body}
          creatorId={usermeep.creatorId}
          imageUrl={usermeep.imageUrl}
          userMeep={true}
        ></MeepCard>
      );
    });
    setContent(content);

    setIsLoading(false)
  }
  useEffect(() => {
    getUserMeeps()
  }, [Id]);



  async function getUserImgMeeps() {
    const response = await fetch(`${APIURL}api/usermeeps/getuserimgmeeps/${Id}`);
    const data = await response.json();

    const content = data.meeps.map((usermeep: meep) => {
      return (
        <MeepCard
          id={usermeep.id}
          body={usermeep.body}
          creatorId={usermeep.creatorId}
          imageUrl={usermeep.imageUrl}
          userMeep={true}
        ></MeepCard>
      );
    });
    setContent(content);
  }

  async function getUserLikes() {
    setIsLoading(true)
    const response = await fetch(`${APIURL}/api/usermeeps/getlikedmeeps/${Id}`);
    const data = await response.json();
    const content = data.likemeeps.map((usermeep: meep) => {
      return (
        <MeepCard
          id={usermeep.id}
          body={usermeep.body}
          creatorId={usermeep.creatorId}
          imageUrl={usermeep.imageUrl}
          userMeep={false}
        ></MeepCard>
      );
    });
    setContent(content);
    setIsLoading(false)
 
  }
  return (
    <>
      <div className="feedbutton-Container">
        <button autoFocus onClick={getUserMeeps}> meeps</button>
        <button onClick={getUserLikes}>Likes</button>
      </div>
<hr className="userHorizontal-Divider"></hr>
      <div className="UserFeed-Container">{!isLoading && content}</div>
    </>
  );
}
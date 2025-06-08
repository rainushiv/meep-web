import { useEffect, useState } from "react";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import "./HomeUserFeed.css";
import Divider from "@mui/joy/Divider";
import MeepCard from "../UI/MeepCard";
import { APIURL } from "../../App";
import { Link } from "react-router-dom";

type meep = {
  id: number;
  body: string;
  creatorId: number;
  imageUrl:string;
};
export default function HomeUserFeed() {
  const [isLoading,setIsLoading] = useState(false)
  const [content, setContent] = useState();
  const Id = useStoreAuth((state) => state.Id);
  const Token = useStoreAuth((state)=> state.Token)


  async function getFeed() {
    setIsLoading(true)
    const response = await fetch(`${APIURL}/api/usermeeps/usermeepfeed/${Id}`,{
      headers:{
        "Authorization":"Bearer "+Token
      }
    });
    const data = await response.json();
    const content = data.usermeepfeed.map((usermeep: meep) => {
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

  useEffect(() => {
    getFeed();
  }, []);

  async function getUserMeeps() {
    setIsLoading(true)
    const response = await fetch(`${APIURL}/api/usermeeps/getusermeeps/${Id}?page=1`,{
      headers:{
        "Authorization":"Bearer "+Token
      }
    });
    const data = await response.json();

    const content = data.usermeeps.map((usermeep: meep) => {
      return (
        <MeepCard
          id={usermeep.id}
          body={usermeep.body}
          creatorId={usermeep.creatorId}
          imageUrl={null}
          userMeep={true}
        ></MeepCard>
      );
    });
    setContent(content);

    setIsLoading(false)
  }

  async function getUserImgMeeps() {
    setIsLoading(true)
    const response = await fetch(`${APIURL}/api/usermeeps/getuserimgmeeps/${Id}`,{
      headers:{
        "Authorization":"Bearer "+Token
      }
    });
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

    setIsLoading(false)
  }

  async function getUserLikes() {

    setIsLoading(true)
    const response = await fetch(`${APIURL}/api/usermeeps/getlikedmeeps/${Id}`,{
      headers:{
        "Authorization":"Bearer "+Token
      }
    });
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

  //     <div className="feedbutton-Container">
  //       <button onClick={getFeed}>Feed</button>
  //       <button onClick={getUserMeeps}>Your meeps</button>
  //       <button onClick={getUserImgMeeps}>Your imeegs</button>
  //       <button onClick={getUserLikes}>Likes</button>
  //     </div>
   return (
    <>
<div className="userFeedSelector-Container">
    <div  className="feedSelectButton-Container">
      <button onClick={getFeed}>Your Feed</button>

      <button onClick={getUserLikes}>Your Likes</button>
    </div>
<hr className="horizontal-Divider"></hr>

</div>
  <hr className="horizontal-Divider"></hr>
      <div className="homeUserFeed-Container">{!isLoading  && content}</div>
    </>
  );
}

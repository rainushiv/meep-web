import { useEffect, useState } from "react";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import "./HomeUserFeed.css";
import Divider from "@mui/joy/Divider";
import MeepCard from "../UI/MeepCard";

type meep = {
  id: number;
  body: string;
  creatorId: number;
  imageUrl:string;
};
export default function HomeUserFeed() {
  const [userFeed, setUserFeed] = useState();
  const [content, setContent] = useState();
  const Id = useStoreAuth((state) => state.Id);

  async function getFeed() {
    const response = await fetch(`api/usermeeps/usermeepfeed/${Id}`);
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

  useEffect(() => {
    getFeed();
  }, []);

  async function getUserMeeps() {
    const response = await fetch(`api/usermeeps/getusermeeps/${Id}?page=1`);
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
  }

  async function getUserImgMeeps() {
    const response = await fetch(`api/usermeeps/getuserimgmeeps/${Id}`);
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
    const response = await fetch(`api/usermeeps/getlikedmeeps/${Id}`);
    const data = await response.json();
    const content = data.likemeeps.map((usermeep: meep) => {
      return (
        <MeepCard
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
  return (
    <>
      <div className="feedbutton-Container">
        <button onClick={getFeed}>Feed</button>
        <button onClick={getUserMeeps}>Your meeps</button>
        <button onClick={getUserImgMeeps}>Your imeegs</button>
        <button onClick={getUserLikes}>Likes</button>
      </div>

      <Divider></Divider>
      <div className="homeUserFeed-Container">{content}</div>
    </>
  );
}

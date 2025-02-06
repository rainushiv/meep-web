
import { useParams } from "react-router-dom"
import Header from "../../Shared/Components/Header"
import UserContent from "../Components/UserContent";
import { useEffect, useState } from "react";

type user = {

    name: string
}

type propid = {

    propId: string;

}

export default function OtherUser() {


    const userid = useParams().uid;

    return (
        <>
            <Header></Header>
            <UserContent propId={userid}></UserContent>
        </>
    )
}
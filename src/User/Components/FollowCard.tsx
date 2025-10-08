import { useEffect, useState } from "react";

import './FollowCard.css'
import Avatar from "@mui/joy/Avatar/Avatar";
import { APIURL } from "../../App";

type id = {
    id: number;
}

type followtype = {

    followtype: string;
}
export default function FollowCard({ id }: id, { followtype }: followtype) {
    const [currentUser, setCurrentUser] = useState<any>();
    useEffect(() => {


        async function getCurrentFollower() {


            const res = await fetch(`${APIURL}/api/users/${id}/getcurrentuser`);
            const data = await res.json()

            setCurrentUser(data.user[0]);

        }
        getCurrentFollower()

    }, [])


    return (
        <div className='card-Container'>
            <div className="card-Content">
                <div>

                    <div className="card-Title">


                        <Avatar size="sm"></Avatar>

                        <h3>
                            {currentUser && currentUser.name}
                        </h3>
                    </div>
                    { }
                    <button></button>

                </div>
                {currentUser && `@${currentUser.username}`}

            </div>
        </div>
    );
}
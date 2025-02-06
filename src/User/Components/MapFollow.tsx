import FollowCard from "./FollowCard";


type follows = {

    follows: follow[]
}

type follow = {

    follower: number

}

export default function MapFollow({ follows }: follows) {

    return (
        <div>
            <ul>


                {follows.map(follow => { return <FollowCard id={follow.follower}></FollowCard> })}
            </ul>

        </div >
    );
}
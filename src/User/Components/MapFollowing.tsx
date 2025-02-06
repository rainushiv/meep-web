import FollowCard from "./FollowCard"


type follows = {

    follows: follow[]
}

type follow = {

    following: number,

}



export default function MapFollowing({ follows }: follows) {


    return (

        <div>
            <ul>


                {follows.map(follow => { return <FollowCard id={follow.following} ></FollowCard> })}
            </ul>

        </div >

    )


}
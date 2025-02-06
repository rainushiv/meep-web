import UserMeeps from "./UserMeeps"

type meeps = {
    meeps: meep[]
}
type meep = {

    name: string,

    body: string
}
export default function MapUserMeeps({ meeps }: meeps) {
    return (

        <div>
            <ul>


                {meeps.map((meeps) => { return <UserMeeps name={meeps.name} body={meeps.body}></UserMeeps> })}


            </ul>



        </div>


    )
}
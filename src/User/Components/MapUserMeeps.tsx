import UserMeeps from "./UserMeeps"

type meeps = {
    meeps: meep[]
}
type meep = {
    id: number,

    name: string,

    body: string
}
type propId= {

    propId: string | undefined;
}


export default function MapUserMeeps({ meeps }: meeps, propId: propId) {
    return (

        <div>
            <ul>


                {meeps.map((meeps) => { return <UserMeeps id= {meeps.id} name={meeps.name} body={meeps.body} ></UserMeeps> })}


            </ul>



        </div>


    )
}
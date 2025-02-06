

type meeps = {

    name: String,
    body: String
}




export default function UserMeeps({ name, body }: meeps) {

    return (

        <div className="usermeep-Container">
            <div className='title-container'>
                <h3 className='title'>{name}</h3>
            </div>
            <div>
            </div>
            <div className='body-container'>

                <p>{body}</p>
            </div>
        </div>

    )
}
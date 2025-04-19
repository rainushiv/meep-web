import { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from "react"
import Autocomplete from '@mui/joy/Autocomplete';

import './SearchBox.css'
import { Link } from "react-router-dom";
import OtherUser from "../../User/Pages/OtherUser";

type user = {
    _id: number,
    _source: {
        id: String,
        name: String,
        username: String,
        email: String
    }
}
type resultuser = {
hits:user[]
}

export default function SearchBox() {
    const [value, setValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [suggestions, setSuggestions]: any[] = useState([])
    const [searchedUser, setSearchedUser] = useState<resultuser>();
    useEffect(() => {
        const getData = setTimeout(() => {

            async function getSearchedUser() {

                try {
                    const res = await fetch(`api/users/getsearcheduser?username={${value}}`)
                    const data = await res.json()
                    console.log(data.result)
                    setSearchedUser(data.result)

                } catch (err) {
                    console.log(err)

                }





            }
            getSearchedUser()


        }, 500)
        return () => clearTimeout(getData)


    }, [value])

                        console.log(searchedUser)
  
    return (

        <div className="input-wrapper">
            <input placeholder="Type to search..." value={value} onChange={(e) => { setValue(e.target.value) }}></input>
            <div className="suggestion-container">

                {

                     searchedUser && (searchedUser.hits.map((user: user) => {
                        return <div key={user._id}>
                            {
                                 <Link to={`/otheruser/${user._id}`}>
                                    <div className="row-container">

                                        <p>{user._source.username}</p>
                                    </div>

                                </Link>
                            }
                        </div>
                    }
                    ))

                }
            </div>

        </div>
    )

}

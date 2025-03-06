import { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from "react"
import Autocomplete from '@mui/joy/Autocomplete';

import './SearchBox.css'
import { Link } from "react-router-dom";
import OtherUser from "../../User/Pages/OtherUser";

type suggestion = {
    _source: {
        id: String,
        name: String,
        username: String,
        email: String
    }
}

export default function SearchBox() {
    const [value, setValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [suggestions, setSuggestions]: any[] = useState([])
    const [searchedUser, setSearchedUser]: any = useState();
    useEffect(() => {
        const getData = setTimeout(() => {

            async function getSearchedUser() {


                try {


                    const res = await fetch(`api/users/getsearcheduser?username={${value}}`)
                    const data = await res.json()
                    const hit = data.hits.hits[0]
                    setSearchedUser(hit)

                } catch (err) {
                    console.log(err)

                }





            }
            getSearchedUser()


        }, 500)
        return () => clearTimeout(getData)


    }, [value])

    useEffect(() => {

        async function getSuggestions() {

            try {
                const res = await fetch('api/users/getuserselastic')
                const data = await res.json()
                const hits = data.data.hits.hits
                setSuggestions(hits)

                console.log(hits)
            }
            catch (err) {
                console.log(err)
            }

        }

        getSuggestions();


    }, [])


    return (

        <div className="input-wrapper">
            <input placeholder="Type to search..." value={value} onChange={(e) => { setValue(e.target.value), setShowSuggestions(true) }}></input>
            <div className="suggestion-container">

                {

                    showSuggestions && suggestions.length !== 0 && (suggestions.map((suggestion: suggestion) => {

                        const isMatch = suggestion._source.username.toLowerCase().indexOf(value) > -1;
                        return <div>
                            {
                                isMatch && <Link to={`/otheruser/${suggestion._source.id}`}>
                                    <div className="row-container">

                                        <p>{suggestion._source.username}</p>
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

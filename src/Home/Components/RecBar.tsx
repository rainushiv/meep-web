import Divider from "@mui/joy/Divider"
import SearchBox from "../../Shared/Components/SearchBox"
import "./RecBar.css"

interface Name{
    name:String
}
interface Content{
    content:any
}

export default function RecBar( {content}:Content){

return (

    <div className="recBar-Container">
        <SearchBox></SearchBox>
<h3>Reccommended</h3>

        <Divider></Divider>

        <div className="recBar-Content">

{content}
        </div>
    </div>
);
}
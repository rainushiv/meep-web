import Divider from "@mui/joy/Divider"
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
<h3>Reccommended</h3>

        <Divider></Divider>
{content}
    </div>
);
}
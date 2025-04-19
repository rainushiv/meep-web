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
{content}
    </div>
);
}
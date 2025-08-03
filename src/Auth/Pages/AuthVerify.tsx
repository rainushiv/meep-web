import { useState } from "react"


export default function AuthVerify() {
    const [password,setPassword] = useState<string>()

    try{

        const res = fetch()

    }catch(err){
        console.log(err)
    }

    return (
        <> 
        
        <div className="auth-container">
        
         <div className="authInput-Container">
                    <label><b>Email</b></label>
                    <input value={password} id="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}></input>
        </div>
                </div></>
    )
}
import { FormEvent, useEffect, useState } from "react"
import "./AuthEnable2FA.css"
import { useStoreAuth } from "../Components/AuthStore"
import { APIURL } from "../../App"
import IconButton from "@mui/joy/IconButton"

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom"
import Button from "@mui/joy/Button"

export default function AuthEnable2FA(){

    const [qrcode,setQrcode] = useState()
    const [code,setCode] = useState()
    const [userCode,setuserCode] = useState<string>()
    const [isValid,setIsValid] = useState(null)

  const navigate = useNavigate();
    const Id = useStoreAuth((state) => state.Id)
    useEffect(()=>{
        async function getQrcode(){
        const res = await fetch(`${APIURL}/api/users/${Id}/activate2FA`)
        const data = await res.json()

        setQrcode(data.qrcode)
        setCode(data.code)



        }
        getQrcode()


    },[Id])

    async function verifyCode(event: FormEvent){
        event.preventDefault()
        try {
            const res = await fetch(`${APIURL}/api/users/verifyactivation`,{
                                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        code: userCode,
                        userId: Id

                    })


                })
            const data = await res.json()
            setIsValid(data.isValid)


                console.log("two factor authentication failed")


        }catch(err){
            console.log(err)
        }
    }



    return (
        <div className="auth2fa-container"> 
<div className="backButton2fa-Container">
            <div className="flexBackButton2fa-Container" onClick={()=>navigate(-1)}>
            <IconButton sx={[
                  {
                    "&:hover": {
                      color: "white",
                      backgroundColor: "transparent",
                    },
                  },
                ]}>
      <ArrowBackIosIcon className="goBack2fa-Button"></ArrowBackIosIcon>
            </IconButton>
           <h3>back</h3> 
 
            </div>
         </div>
 
            <h3>Step 1: Install Google authenticator</h3>
            <h3>Step 2: Open the app and scan the QR code below or manually enter six digit code </h3>

            { qrcode && <img src={qrcode}></img>}
            {code && <h3>{code}</h3>}
            <form onSubmit={verifyCode}>
            <h3>Step 3: Enter 6 digit code</h3>

            <div className="sixdi-Input">
                <input type="Code" value={userCode} onChange={(e)=>{setuserCode(e.target.value)}} placeholder="2FA code"/>
            </div>
            {isValid && <h4>Success!, Two-Factor authentication is now enabled</h4>}
            {isValid === false && <h4> oops wrong code please try again</h4>}

            <Button type="submit">Submit</Button>
</form>
        </div>
    )
}
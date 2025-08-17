import { FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { APIURL } from "../../App";
import { useStoreAuth } from "../Components/AuthStore";
import "./AuthVerify.css"
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function AuthVerify() {

    const Login = useStoreAuth((state) => state.Login)
    const [userCode,setUserCode] = useState<string>("")
    const [isValid,setIsValid] = useState(null)
    const [currentUser,setCurrentUser] = useState<any>()
    const [isLoading,setIsLoading] = useState(false)

  const navigate = useNavigate();
    const userid = useParams().uid;
    useEffect(()=>{
        async function getUser(){
        setIsLoading(true)
        const result = await fetch(`${APIURL}/api/users/${userid}/getcurrentuser`)
        const data = await result.json()
        console.log(data.user[0])
        setCurrentUser(data.user[0])
 
        setIsLoading(false)
        }
        getUser()
   
    },[])
   async function verifyCode(event: FormEvent){
        event.preventDefault()
        try {
            console.log("wemade it")
            const res = await fetch(`${APIURL}/api/users/verifyuser`,{
                                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        code: userCode,
                        userId: userid

                    })


                })
            const data = await res.json()
                console.log(data)
                setIsValid(data.isValid)
            if (data.isValid){
                Login(+userid!,currentUser.username)

            }else{

            }


        }catch(err){
            console.log(err)
        }
    }



    return (
        <> 
        
        <div className="authverify-container">
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
 
            </div>
         </div>
 
        <form onSubmit={verifyCode}>

         <div className="authverifyInput-Container">
            <div className="authUserInfo-Container">
             <img src={currentUser && !isLoading && currentUser.avatarUrl}></img>
             <h2> {currentUser && !isLoading && currentUser.username}</h2>
 
            </div>
                   <div><b>Please enter 2FA code from your authenticator app </b></div>
                    <input value={userCode} id="password" placeholder="2FA code" onChange={(e) => { setUserCode(e.target.value) }}></input>

            <Button type="submit">Submit</Button>
            {isValid === false && <h4> oops wrong code please try again</h4>}


        </div>
        
        </form>
                </div></>
    )
}
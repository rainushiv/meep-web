
import { FormEvent, useState } from "react"
import { useStoreAuth } from "./AuthStore";
import './AuthContent.css'

export default function AuthContent() {

    const [loginMode, setLoginMode] = useState(false);

    const isLogin = useStoreAuth((state) => state.isLogin)
    const Login = useStoreAuth((state) => state.Login)
    const Logout = useStoreAuth((state) => state.Logout);
    const setEmail = useStoreAuth((state) => state.setEmail)
    const setName = useStoreAuth((state) => state.setName)
    const setId = useStoreAuth((state) => state.setId)
    const setUsername = useStoreAuth((state) => state.setUsername)
    const setPassword = useStoreAuth((state) => state.setPassword)
    const email = useStoreAuth((state) => state.Email)
    const username = useStoreAuth((state) => state.Username)
    const name = useStoreAuth((state) => state.Name)
    const password = useStoreAuth((state) => state.Password)
    const Id = useStoreAuth((state) => state.Id)
    const modeHandler = () => {

        setLoginMode(!loginMode)
        console.log(isLogin)
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!loginMode) {
            try {

                const res = await fetch("api/users/createuser", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        username: username,
                        email: email,
                        password: password,
                    })


                })




                const data = await res.json()

                console.log(data)

                Login(data.user.id)

            }
            catch (err) {
                console.log(err)
            }



        }

        else if (loginMode) {

            try {

                const res = await fetch("api/users/login", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    })


                })

                const data = await res.json()

                console.log(data.user[0].id)

                Login(data.user[0].id);



            } catch (err) {
                console.log(err)
            }


        }

    }







    return (
        <div className="auth-container">
            <h2>{loginMode ? "Login" : "Sign-up"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    {
                        !loginMode && <>
                            <label><b>Name</b></label>
                            <input value={name} id="username" placeholder="Username" onChange={(e) => { setName(e.target.value) }}></input>
                        </>

                    }
                </div>

                <div>
                    {
                        !loginMode && <>
                            <label><b>Username</b></label>
                            <input value={username} id="username" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }}></input>
                        </>

                    }
                </div>
                <div>
                    <label><b>Email</b></label>
                    <input value={email} id="Email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }}></input>

                </div>
                <div>
                    <label><b>Password</b></label>
                    <input value={password} id="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}></input>

                </div>
                <div className="button-container">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={modeHandler}>{!loginMode ? "Aleady have an account?" : "Dont have an account?"}</button>
                </div>

            </form>
        </div>
    )
}
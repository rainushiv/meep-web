import { FormEvent, useState, useRef, useEffect } from "react";
import { useStoreAuth } from "./AuthStore";
import "./AuthContent.css";
import { APIURL } from "../../App";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
export default function AuthContent() {
  const [loginMode, setLoginMode] = useState(false);
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | null | ArrayBuffer>(
    null
  );
  const [isValid, setIsValid] = useState<Boolean>();

  const isLogin = useStoreAuth((state) => state.isLogin);
  const Login = useStoreAuth((state) => state.Login);
  const Logout = useStoreAuth((state) => state.Logout);
  const setEmail = useStoreAuth((state) => state.setEmail);
  const setName = useStoreAuth((state) => state.setName);
  const setId = useStoreAuth((state) => state.setId);
  const setUsername = useStoreAuth((state) => state.setUsername);
  const setPassword = useStoreAuth((state) => state.setPassword);
  const email = useStoreAuth((state) => state.Email);
  const username = useStoreAuth((state) => state.Username);
  const name = useStoreAuth((state) => state.Name);
  const password = useStoreAuth((state) => state.Password);
  const Id = useStoreAuth((state) => state.Id);
  let navigate = useNavigate();
  const modeHandler = () => {
    setLoginMode(!loginMode);
    console.log(isLogin);
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!loginMode) {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("avatar", file!);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        const res = await fetch(`${APIURL}/api/users/createuser`, {
          method: "POST",
          body: formData,
        });
        console.log(res);
        const data = await res.json();

        console.log(data.user);

        Login(data.userId,data.username);
      } catch (err) {
        console.log(err);
      }
    } else if (loginMode) {
      try {
        const res = await fetch(`${APIURL}/api/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const data = await res.json();
        if (data.user2fa) {
          navigate(`/${data.userId}/authverify`);
        } else {
          Login(data.userId,data.username);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleTestSignIn = async () => {
    try {
      const res = await fetch(`${APIURL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "sad567@gmail.com",
          password: "Buttpoop123",
        }),
      });

      const data = await res.json();

      console.log(data);
      Login(data.userId,data.username);
    } catch (err) {
      console.log(err);
    }
  };
  const filePicker = useRef<HTMLInputElement>(null);

  const pickImageHandler = () => {
    if (filePicker.current) {
      filePicker.current.click();
    }
  };

  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    if (!file) {
      return;
    } else {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div className="auth-container">
      <h2>{loginMode ? "Login" : "Sign-up"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="avatarInput-Container">
          {!loginMode && (
            <>
              <label className="avatar-Title">
                <b>Avatar</b>
              </label>
              <div className="avatar-Container">
                {typeof previewUrl === "string" ? (
                  <img src={previewUrl} alt="preview"></img>
                ) : (
                  <button
                    className="upload-button"
                    type="button"
                    onClick={pickImageHandler}
                  >
                    upload
                  </button>
                )}
              </div>
              <input
                type="file"
                ref={filePicker}
                style={{ display: "none" }}
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
              ></input>
            </>
          )}
        </div>
        <div className="authInput-Container">
          {!loginMode && (
            <>
              <label>
                <b>Name</b>
              </label>
              <input
                value={name}
                id="username"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </>
          )}
        </div>

        <div className="authInput-Container">
          {!loginMode && (
            <>
              <label>
                <b>Username</b>
              </label>
              <input
                value={username}
                id="username"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></input>
            </>
          )}
        </div>
        <div className="authInput-Container">
          <label>
            <b>Email</b>
          </label>
          <input
            value={email}
            id="Email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="authInput-Container">
          <label>
            <b>Password</b>
          </label>
          <input
            value={password}
            id="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div className="button-container">
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={modeHandler}>
            {!loginMode ? "Aleady have an account?" : "Dont have an account?"}
          </Button>
        </div>
        <div className="testButton-Container">
          <Button onClick={handleTestSignIn}>Test Account Sign-In</Button>
        </div>
      </form>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useStoreAuth } from "../../Auth/Components/AuthStore";
import "./Header.css";
import Divider from "@mui/joy/Divider";
import SearchBox from "./SearchBox";

export default function Header() {
  const isLogin = useStoreAuth((state) => state.isLogin);

  return (
    <>
      <nav className="nav-container">
        <Link className="nav-brand" to={"/home"}>
          Meeps
        </Link>
        <SearchBox></SearchBox>

        <ul className="nav-list">
          {isLogin ? (
            <>
              <li>
                <Link to={"/chat"}>Chat</Link>
                </li>

              <li>
                <Link to={"/user"}>Profile</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to={"/auth"}>Login/Signup</Link>
            </li>
          )}
        </ul>
      </nav>
      <Divider></Divider>
    </>
  );
}

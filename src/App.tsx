import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { useStoreAuth } from "./Auth/Components/AuthStore";
import "./App.css";
import Home from "./Home/Pages/Home";
import Auth from "./Auth/Pages/Auth";
import Meeps from "./Meeps/Pages/Meeps";
import User from "./User/Pages/User";
import OtherUser from "./User/Pages/OtherUser";
import Chat from "./Chat/Pages/Chat";

function App() {
  const isLogin = useStoreAuth((state) => state.isLogin);
  let route;
  if (isLogin) {
    route = (
      <>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/meeps" element={<Meeps />} />
        <Route path="/user" element={<User />} />
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/otheruser/:uid" element={<OtherUser />} />
        <Route path="/auth" element={<Navigate to="/home" />} />
      </>
    );
  } else {
    route = (
      <>
        <Route index element={<Auth />} />
        <Route path="/home" element={<Navigate to="/Auth" />} />dd
        <Route path="/auth" element={<Auth />} />
      </>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>{route}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

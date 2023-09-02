import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./scenes/Login/Login";
import Home from "./scenes/Home/Home";
import Profile from "./scenes/Profile/Profile";
import { CssBaseline } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Register from "./scenes/Login/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "./redux/store";
import { setLoggedIn, setLogout } from "./redux/reducers/authReducers";
import { useEffect } from "react";
import NavBar from "./scenes/Navbar/NavBar";
import Chat from "./scenes/Chat/Chat";

function App() {
  // const token = useSelector((state) => state.token);
  const loggedIn = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const logCheck = async () => {
    try {
      const { data } = await axios.get(`${server}/user/me/profile`, {
        withCredentials: true,
      });
      dispatch(setLoggedIn());

    } catch (error) {
      dispatch(setLogout());
      console.log(error);

    }
  }

  useEffect(() => {
    logCheck()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='app'>
      <BrowserRouter>
        <CssBaseline />
        {loggedIn && <NavBar />}
        <Routes>
          <Route path='/home' element={loggedIn ? <Home /> : <Navigate to={"/"} />} />
          <Route path='/' element={loggedIn ? <Navigate to={"/home"} /> : <Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/:userId' element={loggedIn ? <Profile /> : <Navigate to={"/"} />} />
          <Route path="/chat" element={loggedIn ? <Chat /> : <Navigate to={"/"} />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;

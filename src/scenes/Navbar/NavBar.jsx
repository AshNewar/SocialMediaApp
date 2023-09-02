import {
  IconButton,
  InputBase,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { AiOutlineLogout } from "react-icons/ai";

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Menu,
  Close,
  AccountCircle,
  ExitToApp,
  Logout,
} from "@mui/icons-material";


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { setMode } from "../../redux/reducers/authReducers";

const NavBar = () => {
  const [curtheme, setTheme] = useState("lighttheme");
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const navigate = useNavigate();

  const chatHandler = () => {
    navigate("/chat");
  }



  const themeHandler = () => {
    dispatch(setMode());
    if (curtheme === "lighttheme") {
      setTheme("darktheme");
    } else {
      setTheme("lighttheme");
    }
  }
  useEffect(() => {
    document.body.className = curtheme;
  }, [curtheme]);

  return (
    <section className='' >
      <main className='nav-main section_padding'>
        <div className='nav-sec1'>
          <h1 className='nav-heading' onClick={() => navigate("/home")}>
            JustPostIT
          </h1>
          <div className='nav-search'>
            <InputBase sx={{ color: "var(--para-clr)" }} placeholder='Search..' className="nav-input" />
            <IconButton sx={{ color: "var(--para-clr)" }}>
              <Search />
            </IconButton>
          </div>
        </div>
        <div className='nav-sec2'>
          {mode === "light" ? <LightMode sx={{ fontSize: "25px" }} onClick={themeHandler} /> : <DarkMode sx={{ fontSize: "25px" }} onClick={themeHandler} />}

          <Message sx={{ fontSize: "25px" }} onClick={chatHandler} />
          <Notifications sx={{ fontSize: "25px" }} />
          <HomeIcon sx={{ fontSize: "25px" }} onClick={() => navigate("/home")} />
          <Logout sx={{ fontSize: "25px" }} />


        </div>
        <div className="nav-menu">
          {toggle ? <Close sx={{ fontSize: "25px" }} onClick={() => setToggle(!toggle)} /> : <Menu sx={{ fontSize: "25px" }} onClick={() => setToggle(!toggle)} />}

          {toggle ? <div className="nav-menuList">
            {mode === "light" ? <LightMode sx={{ fontSize: "25px" }} onClick={themeHandler} /> : <DarkMode sx={{ fontSize: "25px" }} onClick={themeHandler} />}

            <Message onClick={chatHandler} sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <HomeIcon sx={{ fontSize: "25px" }} onClick={() => navigate("/home")} />
            <Logout sx={{ fontSize: "25px" }} />




          </div>
            : null
          }


        </div>
      </main>
    </section>
  );
};

export default NavBar;

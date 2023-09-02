import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../../redux/store.js";
import { IconButton } from "@mui/material";
import {
  GroupAddOutlined,
  LinkedIn,
  LocationOnOutlined,
  Twitter,
  WorkOutline,
} from "@mui/icons-material";
import "./widget.css";

const UserWidgets = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const getUserLog = async () => {
    try {
      const { data } = await axios.get(`${server}/user/${userId}`, {
        withCredentials: true,
      });
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserLog();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }
  return (
    <div className='user-widgets'>
      <div className='user-widgets-sub'>
        <div className='user-sec1 divider'>
          <div className='user-sec-11'>
            <div className='user-pic-sec'>
              <img src={user.picturePath} alt='user-pic' className='user-pic' />
              <div className='user-name'>
                <div>{user.firstName + " "+user.lastName}</div>
                <div className="wid-para">{user.email}</div>
              </div>
            </div>
          </div>

          <div className='user-info'>
            <IconButton sx={{backgroundColor:"var(--blue)"}}>
              <GroupAddOutlined sx={{color:"var(--para-clr)"}}/>
            </IconButton>
          </div>
        </div>

        <div className='user-sec2 divider'>
          <div className='user-common-info'>
            <LocationOnOutlined />
            {user.location}
          </div>
          <div className='user-common-info'>
            <WorkOutline />
            {user.occupation}
          </div>
        </div>
        <div className='user-sec3 divider'>
          <div className='user-common-info2'>
            <span>profileview</span>
            {Math.floor(Math.random()*1000)}
          </div>
          <div className='user-common-info2'>
            <span>impression</span>
            {Math.floor(Math.random()*1000)}
          </div>
        </div>
        <div className='user-sec4 '>
          <span className="user-social">SocialProfile</span>
          <div className='user-sec4-main1'>
            <Twitter />
            <div className='user-info'>
              <div className='user-name'><b>Twitter</b></div>
              <div className='user-name'>Network Connection</div>
            </div>
          </div>
          <div className='user-sec4-main1'>
            <LinkedIn />
            <div className='user-info'>
              <div className='user-name'><b>LinkedIn</b></div>
              <div className='user-name'>NetworkPlatFrom</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserWidgets;

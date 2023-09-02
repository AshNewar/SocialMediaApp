import {
  PersonAddOutlined,
  PersonRemoveOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../../redux/store.js";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../../../redux/reducers/authReducers.js";

const Friends = ({ friendId, name, subtitle, picturePath }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const friends = user.friends;
  const isFriend = friends.find((friends) => friends._id === friendId);
  const sameUser = friendId===user._id;

  const updateFriends = async () => {
    try {
      const {data} = await axios.get(`${server}/user/${user._id}/${friendId}`, {
        withCredentials: true,
      });
      dispatch(setFriends(data.formattedFriends));
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  return (
    <div
      className='user-sec1 divider'
      
    >
      <div className='user-sec-11' onClick={() => {
        navigate(`/${friendId}`);
        navigate(0);
        }}>
        <div className='user-pic-sec'>
          <img src={picturePath} alt='user-pic' className='user-pic' />
          <div className='user-name'>
            <div>{name}</div>
            <div>{subtitle}</div>
          </div>
        </div>
      </div>

      <div className='user-info'>
      {!sameUser && <IconButton
          onClick={() => {
            updateFriends();
          }}
          sx={{backgroundColor:"var(--blue)"}}
        >
          {isFriend ? <PersonRemoveOutlined sx={{color:"var(--para-clr)"}} /> : <PersonAddOutlined sx={{color:"var(--para-clr)"}}/>}
        </IconButton>}
        
      </div>
    </div>
  );
};

export default Friends;

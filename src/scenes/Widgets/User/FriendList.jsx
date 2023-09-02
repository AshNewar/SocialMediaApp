import { useDispatch, useSelector } from "react-redux";
import Friends from "./Friends";
import axios from "axios";
import { server } from "../../../redux/store";
import { useEffect } from "react";
import { setFriends } from "../../../redux/reducers/authReducers";

const FriendList = ({ userId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const friends = user.friends;
  const friendList = async () => {
    try {
      const { data } = await axios.get(`${server}/user/${userId}/friends`, {
        withCredentials: true,
      })
      dispatch(setFriends(data.formattedFriends));


    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    friendList();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='user-widgets'>
      <div className='user-widgets-sub'>
        <section>
          <h2>FriendList</h2>
        </section>
        <section>
          {friends.map((friend, index) => (
            <Friends
              key={index}
              friendId={friend._id}
              name={friend.firstName + " " + friend.lastName}
              subtitle={friend.location}
              picturePath={friend.picturePath}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default FriendList;

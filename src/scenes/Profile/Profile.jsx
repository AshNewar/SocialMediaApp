import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { server } from "../../redux/store";
import NavBar from "../Navbar/NavBar";
import AllPost from "../Widgets/AllPosts/AllPost";
import PostWidget from "../Widgets/Post/PostWidget";
import FriendList from "../Widgets/User/FriendList";
import UserWidgets from "../Widgets/User/Widgets";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${server}/user/${userId}`, {
        withCredentials: true,
      })
      setUser(data.user);
      console.log(user.picturePath);

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <div>
      {/* <NavBar /> */}
      <div className='home section_padding'>
        <section className='homeSection home-user'>
          <UserWidgets userId={userId} picturePath={user.picturePath} />
          <FriendList userId={userId} />
        </section>
        <section className='homeSection'>
          <PostWidget picturePath={user.picturePath} />
          <AllPost userId={userId} isProfile />
        </section>
      </div>
    </div>
  )
}

export default Profile

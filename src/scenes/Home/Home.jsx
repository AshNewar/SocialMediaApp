import { useSelector } from "react-redux";
// import NavBar from "../Navbar/NavBar";
import UserWidgets from "../Widgets/User/Widgets";
import "./home.css";
import PostWidget from "../Widgets/Post/PostWidget";
import AllPost from "../Widgets/AllPosts/AllPost";
import FriendList from "../Widgets/User/FriendList";

const Home = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <div className='home section_padding'>
        <section className='homeSection home-user'>
          <UserWidgets userId={user._id} picturePath={user.picturePath} />
          <FriendList userId={user._id} />
        </section>
        <section className='homeSection'>
          <PostWidget picturePath={user.picturePath} />
          <AllPost userId={user._id} />
        </section>
      </div>
    </div>
  );
};

export default Home;

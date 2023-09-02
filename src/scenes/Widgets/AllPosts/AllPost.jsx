import axios from "axios";
import { server } from "../../../redux/store.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Post from "./Post.jsx";
import { setPosts } from "../../../redux/reducers/authReducers.js";

const AllPost = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const getAllPosts = async () => {
    try {
      const { data } = await axios.get(`${server}/post/`, {
        withCredentials: true,
      });
      dispatch(setPosts(data.posts));
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPost = async (userId) => {
    try {
      const { data } = await axios.get(`${server}/post/${userId}/posts`, {
        withCredentials: true,
      });
      dispatch(setPosts(data.posts));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPost(userId);
    } else {
      getAllPosts();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className='allpost'>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          location,
          description,
          postPicturePath,
          userPicturePath,
          likes,
          comment,
        }) => (
          <Post
            key={_id}
            id={_id}
            userId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            postPicturePath={postPicturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comment}
          />
        )
      )}
    </div>
  );
};

export default AllPost;

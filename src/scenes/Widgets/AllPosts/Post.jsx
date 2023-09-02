/* eslint-disable react/prop-types */
import {
  Comment,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  Share,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import "./allPost.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { server } from "../../../redux/store.js";
import { setPost } from "../../../redux/reducers/authReducers";
import Friends from "../User/Friends";

const Post = ({
  id,
  userId,
  name,
  description,
  location,
  postPicturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const user = useSelector((state) => state.user);
  // const mode=useSelector((state) => state.mode);
  const isLiked = Boolean(likes[user._id]);
  const [isComment, setComment] = useState(false);
  const liked = Object.keys(likes).length;
  const dispatch = useDispatch();
  const updateLikes = async () => {
    try {
      const { data } = await axios.get(`${server}/post/${id}/likes`, {
        withCredentials: true,
      });
      dispatch(setPost({ posts: data.updatedPost }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='media'>
      <Friends
        friendId={userId}
        name={name}
        subtitle={location}
        picturePath={userPicturePath}
      />
      <div className='media-1'>{description}</div>
      <div className='media-1'>
        <img src={postPicturePath} alt='newar' className='post-image' />
      </div>
      <div className='media-2'>
        <div className='media-22'>
          <div className='media-like'>
            <IconButton
              onClick={() => {
                updateLikes();
              }}
            >
              {isLiked ? (
                <FavoriteOutlined sx={{ color: "var(--likes-bg-clr)" }} />
              ) : (
                <FavoriteBorderOutlined sx={{}} />
              )}
            </IconButton>
            <span>Likes</span>
            <span>{liked}</span>
          </div>
          <div className='media-like'>
            <IconButton onClick={() => setComment(!isComment)}>
              <Comment sx={{color:"var(--para-clr)"}}/>
            </IconButton>
            <span>{comments.length}</span>
          </div>
        </div>
        <IconButton>
          <Share sx={{color:"var(--para-clr)"}} />
        </IconButton>
      </div>
      {isComment && (
        <div>
          {comments.map((comment, index) => (
            <div key={index} className=''>
              {comment}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;

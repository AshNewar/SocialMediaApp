import Dropzone from "react-dropzone";
import "./post.css";
import { useState } from "react";
import {
  AttachFile,
  DeleteOutlineOutlined,
  Image,
  Mic,
  MusicVideo,
} from "@mui/icons-material";
import { toast } from "react-hot-toast";
import axios from "axios";
import { server } from "../../../redux/store.js";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../redux/reducers/authReducers";

const PostWidget = ({picturePath}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [photo, setPhoto] = useState({});
  const [desc, setDesc] = useState("");
  const [isImage, setImageCLicked] = useState(false);
  const postHandle = async () => {
    if (!photo.name) {
      toast.error("Add Post");
    } else {
      try {
        setDesc(desc);
        const {data} = await axios.post(
          `${server}/post`,
          {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            description: desc,
            postPicturePath: photo.name,
            userPicturePath: user.picturePath,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(data.posts);
        dispatch(setPosts(data.posts));
        toast.success("Post Uploaded");
        setDesc("");
        setImageCLicked(false);
        setPhoto({});
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className='post-main'>
      <div className='post-sec1'>
        <div className='post-top1'>
          <img src={picturePath} alt='user-pic' className='user-pic' />
          <input
            type='text'
            placeholder='Write Something..'
            className='post-input'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        {isImage && (
          <div className='post-sec2'>
            <div className='dropZone'>
              <Dropzone
                acceptedFiles='.jpg,.jpeg,.png'
                multiple={false}
                onDrop={(acceptedFiles) => setPhoto(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {photo.name ? (
                        <p>{photo.name}</p>
                      ) : (
                        <p> Drag Or Click To Upload Profile Picture</p>
                      )}
                    </div>
                  </section>
                )}
              </Dropzone>
              {photo.name && (
                <DeleteOutlineOutlined onClick={() => setPhoto({})} />
              )}
            </div>
          </div>
        )}

        <div className='post-sec3'>
          <div className='postIcon' onClick={() => setImageCLicked(!isImage)}>
            <Image /> Image
          </div>
          <div className='postIcon' onClick={() => setImageCLicked(!isImage)}>
            <Mic /> Image
          </div>
          <div className='postIcon' onClick={() => setImageCLicked(!isImage)}>
            <AttachFile /> Image
          </div>
          <div className='postIcon' onClick={() => setImageCLicked(!isImage)}>
            <MusicVideo /> Image
          </div>
          <button className='postButton' onClick={postHandle}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostWidget;

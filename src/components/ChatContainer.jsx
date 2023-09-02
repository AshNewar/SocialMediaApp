import axios from "axios";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { useEffect, useState } from "react";
import { server } from "../redux/store.js";

const ChatContainer = ({ user, partner, socket }) => {
  const [message, setMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);


  const getMsg = async () => {
    try {
      const { data } = await axios.post(
        `${server}/chat/getmsg/`,
        {
          sender: user,
          receiver: partner,
        },
        {
          withCredentials: true,
        }
      );
      setMessage(data.mapMsg);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);


  useEffect(() => {
    getMsg();
  }, [partner]); //eslint-disable-line

  const handleMsg = async (msg) => {
    try {
      const data = await axios.post(
        `${server}/chat/addmsg/`,
        { sender: user, receiver: partner, message: msg },
        {
          withCredentials: true,
        }
      );
      socket.current.emit("send-msg", {
        to: partner._id,
        from: user._id,
        message: msg,

      });
      const msgs = [...message];
      msgs.push({ fromSelf: true, message: msg });
      setMessage(msgs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='chat-message-container'>
      <div className='chat-body-title'>
        <div className='chat-item'>
          <img
            src={partner.picturePath}
            alt={partner.firstName}
            className='chat-image'
          />
        </div>
        <div>
          <p><b>{partner.firstName + ' ' + partner.lastName}</b></p>
        </div>
      </div>

      <Message message={message} />
      <ChatInput handleMsg={handleMsg} />
    </div>
  );
};

export default ChatContainer;

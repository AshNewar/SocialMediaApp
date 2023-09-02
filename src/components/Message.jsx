import { useEffect, useRef } from "react";

const Message = ({ message }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message])

  // const
  return (
    <div className='message-container'>
      {message.map((msg, index) => {
        return (
          <div ref={scrollRef} key={index}>
            <div className={msg.fromSelf ? "sendMsg" : "receiveMsg"}>
              <p className='chat'><b>{msg.message}</b></p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Message;

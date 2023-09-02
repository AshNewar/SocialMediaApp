import Picker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { LuSmilePlus } from "react-icons/lu";
import { VscSend } from "react-icons/vsc";

const ChatInput = ({handleMsg}) => {
  const [emoji, setEmoji] = useState(false);
  const [msg, setMsg] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if(msg.length>0){
      handleMsg(msg);
      setMsg("");
    }
  };
  return (
    <div>
      <div className='emojiPicker'>
        {emoji && (
          <Picker
            onEmojiClick={(emojiObject) =>
              setMsg((msg) => msg + emojiObject.emoji)
            }
          />
        )}
      </div>

      <div className='chat-container-input'>
        <div>
          <LuSmilePlus size={"2rem"} onClick={() => setEmoji(!emoji)} />
        </div>
        <form className='input-container' onSubmit={handleSubmit}>
          <input
            type='text'
            className='chat-input'
            placeholder='Write Your Message'
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button type='submit' className='send'>
            <VscSend size={"2rem"} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;

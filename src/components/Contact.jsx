import React from "react";

const Contact = ({ name, user, picturePath, clickHandler }) => {
  return (
    <div className='contact-body' onClick={() => clickHandler(user)}>
      <div className="chat-item">
        <img src={picturePath} alt={name} className='chat-image' />
      </div>
      <p><b>{name}</b></p>
    </div>
  );
};

export default Contact;

import React from "react";

const Welcome = ({ user }) => {
  return (
    <div className="welcome">
      <div className='welcome-user'>
        <img src='robot.gif' alt='robot' className="robo-img" />
      </div>
      <div>Welcome, {user.firstName}!</div>
      <div>Click On Any Contact to Start Chat</div>

    </div>

  );
};

export default Welcome;

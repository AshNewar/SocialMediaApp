import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./chat.css";
import Contact from "../../components/Contact";
import Welcome from "../../components/Welcome";
import ChatContainer from "../../components/ChatContainer";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { server } from "../../redux/store.js";


const Chat = () => {
    const socket = useRef();
    const user = useSelector((state) => state.user)
    const [contacts, setContacts] = useState([]);
    const [currentChatUser, setCurrentChat] = useState(undefined);


    const clickHandler = (contact) => {
        setCurrentChat(contact);

    }
    useEffect(() => {
        if (user) {
            socket.current = io(`${server}`);
            socket.current.emit("add-user", user._id);

        }

    }, [])

    const getContacts = async () => {
        try {
            const { data } = await axios.get(
                `${server}/user/${user._id}/friends`,
                {
                    withCredentials: true,
                }
            );
            setContacts(data.formattedFriends);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getContacts();
    }, []); //eslint-disable-line

    return (
        <div className='chat-container'>
            {/* <div className='chat-header'>
                <div className="welcome-user">
                    <img src={user.picturePath} alt={user.firstName} className="chat-image" />
                    <h2>{user.username}</h2>
                </div>

                <h1>Let'sCHAT</h1>
                <AiOutlineLogout size={"2rem"} />
            </div> */}
            <div className='chat-body'>
                <div className='chat-sec1'>
                    <div className='chat-title'><h3>CONTACT</h3></div>

                    <div className='chat-sec1-body'>
                        <div className='chat-list'>
                            {contacts.map((contact, index) => (
                                <Contact
                                    key={index}
                                    user={contact}
                                    name={contact.firstName + ' ' + contact.lastName}
                                    picturePath={contact.picturePath}
                                    clickHandler={clickHandler}
                                />
                            ))}
                        </div>
                    </div>

                </div>
                <div className='chat-sec2'>
                    {!currentChatUser ? <Welcome user={user} /> : <ChatContainer user={user} partner={currentChatUser} socket={socket} />}
                </div>
            </div>
        </div>
    );
};

export default Chat;

import React, { useEffect, useRef, useState } from 'react'
import { axiosClubsInstance } from '../../instance/Axios'
import './ChatBox.css'
import dp from '../../assets/dp.png'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'


const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage ,clubAuth}) => {

    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const scroll = useRef()

    ////////fetching data for header of the chat
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser)
        const getUserData = async () => {
            try {
                const { data } = await axiosClubsInstance.get(`/player/${userId}`,
                { headers: { 'Authorization': `Bearer ${clubAuth.token}` }}
                )
                setUserData(data)
            } catch (err) {
                console.log(err);
            }
        }
        if (chat !== null) getUserData()
    }, [chat, currentUser])

    ///////////// fetching data for messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axiosClubsInstance.get(`/message/${chat._id}`,
                { headers: { 'Authorization': `Bearer ${clubAuth.token}` }}
                )
                console.log(data);
                setMessages(data)
            } catch (err) {
                console.log(err);
            }
        }
        if (chat !== null) fetchMessages()
    }, [chat])

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id
        }
        // send message to socket server
        const receiverId = chat.members.find((id) => id !== currentUser);
        setSendMessage({ ...message, receiverId })

        //////// send message to database
        try {
            const { data } = await axiosClubsInstance.post('/message', message,
            { headers: { 'Authorization': `Bearer ${clubAuth.token}` }}
            )
            setMessages([...messages, data])
            setNewMessage("")

        } catch (err) {
            console.log(err);
        }
    }

    // Receive Message from parent component
    useEffect(() => {
        console.log("Message Arrived: ", receiveMessage)
        if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
            setMessages([...messages, receiveMessage]);
        }

    }, [receiveMessage])

   

    ///////// Always scroll to last message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])


    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        <div className="chat-header">
                            <div className="follower">
                                <div>
                                    {/* <div className='my-style' style={{display:"flex"}} > */}
                                    <img src={userData?.image ? userData.image : dp} alt=""
                                        className='followerImage'
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                    <div className="name" style={{ fontSize: "1rem " }}>
                                        <span>{userData?.name}</span>
                                    </div>
                                    {/* </div> */}
                                </div>
                            </div>
                            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
                        </div>

                        {/* chatBox Messages */}
                        <div className="chat-body">
                            {messages.map((message) => (
                                <>
                                    <div ref={scroll}
                                        className={
                                            message.senderId === currentUser
                                                ? "message own"
                                                : "message"
                                        }  >
                                        <span>{message.text}</span>
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                </>
                            ))}
                        </div>

                        {/* Chat Sender */}
                        <div className="chat-sender">
                            <div>+</div>
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            {newMessage !=="" ? <div className="send-button button-one" onClick={handleSend}>
                                Send
                            </div> : ""}
                        </div>
                    </>
                ) : (
                    <span className="chatbox-empty-message">
                        Tap on a Chat to Start Conversation
                    </span>
                )}

            </div>
        </>
    )
}

export default ChatBox
import React, { useEffect, useState } from 'react'
import { axiosPlayersInstance } from '../../instance/Axios'
import dp from '../../assets/dp.png'

const Conversation = ({ data, currentUserId, online, playerAuth }) => {

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserId)
        // console.log(userId);
        const getUserData = async () => {
            try {
                const { data } = await axiosPlayersInstance.get(`/club/${userId}`,
                    { headers: { 'Authorization': `Bearer ${playerAuth.token}` } }
                )
                setUserData(data)
            } catch (err) {
                console.log(err);
            }
        }
        getUserData()

    }, [])



    return (
        <>
            <div className="follower conversation"  >
                <div>
                    {online && <div className="online-dot"></div>}
                    <img src={userData?.image ? userData.image : dp} alt=""
                        className='followerImage'
                        style={{ width: '50px', height: '50px' }}
                    />
                    <div className="name" style={{ fontSize: "1rem " }}>
                        <span>{userData?.name}</span>
                        <span>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>
            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </>
    )
}

export default Conversation
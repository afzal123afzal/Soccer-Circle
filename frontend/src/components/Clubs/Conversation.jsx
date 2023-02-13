import React, { useEffect, useState } from 'react'
import { axiosClubsInstance } from '../../instance/Axios'
import dp from '../../assets/dp.png'

const Conversation = ({ data, currentUserId, online,clubAuth }) => {

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserId)
        console.log(userId);
        const getUserData = async () => {
            try {
                const { data } = await axiosClubsInstance.get(`/player/${userId}`,
                { headers: { 'Authorization': `Bearer ${clubAuth.token}` }}
                )
                setUserData(data)
                console.log(data);
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
                    { online && <div className="online-dot"></div>}
                    {/* <div className='my-style' style={{display:"flex"}} > */}
                    <img src={userData?.image ? userData.image : dp} alt=""
                        className='followerImage'
                        style={{ width: '50px', height: '50px' }}
                    />
                    <div className="name" style={{ fontSize: "1rem " }}>
                        <span>{userData?.name}</span>
                        <span>{online ? "Online" : "Offline"}</span>
                    </div>
                    {/* </div> */}
                </div>
            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </>
    )
}

export default Conversation
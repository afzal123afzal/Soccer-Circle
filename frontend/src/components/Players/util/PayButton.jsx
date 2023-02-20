import React from 'react'
import { axiosPlayersInstance } from '../../../instance/Axios'
import { useAuthContext } from '../../../hooks/Player/useAuthContext';
import { useSelector } from 'react-redux';

function PayButton() {
    const player = useSelector((state) => state.player.playerDetails)
    const email = player.email
    const handleCheckout = async () => {
        try {
            const response = await axiosPlayersInstance.post("/create-checkout-session", {
                email: email, membership: 'SC Membership'
            },
                { headers: { 'Authorization': `Bearer ${player.token}` } }
            )
            if (response.data.url) {
                window.location.href = response.data.url
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <>

            <button onClick={handleCheckout} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ">
                Subscribe
            </button>


        </>
    )
}

export default PayButton
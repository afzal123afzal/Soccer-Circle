import React, { useEffect } from 'react'
// import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PaymentSuccess from '../../components/Players/util/PaymentSuccess';
import { axiosPlayersInstance } from '../../instance/Axios';
import { useAuthContext } from '../../hooks/Player/useAuthContext'



function CheckoutSuccess() {
  const { player } = useAuthContext()
  console.log(player);
  if (player != null) {
    // const email = player.data.email
    // console.log(email);
  }
  // const email = player.data.email

  useEffect(() => {
    const fetchPlayer = async () => {
      if (player != null) {
        console.log(player.data._id);
        const id = player.data._id

        try {
          const response = await axiosPlayersInstance.patch('/add-details/' + id, { payment: true })
          console.log(response);
          console.log('hi');

        } catch (err) {
          console.log(err.message);
        }
      }

    }
    fetchPlayer()

  }, [player])

  const navigate = useNavigate()
  const redirect = () => {

    setTimeout(() => {
      navigate('/player/clubs')
    }, 3000);
  }
  redirect()

  return (
    <div >
      {/* <h2>CheckoutSuccess</h2> */}

      <PaymentSuccess />



    </div>

  )
}

export default CheckoutSuccess
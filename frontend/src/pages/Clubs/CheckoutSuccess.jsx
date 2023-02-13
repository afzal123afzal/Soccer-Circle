import React, { useEffect } from 'react'
// import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PaymentSuccess from '../../components/Clubs/util/PaymentSuccess';
import { axiosClubsInstance, axiosPlayersInstance } from '../../instance/Axios';
import { useAuthContext } from '../../hooks/Player/useAuthContext'
import { useDispatch, useSelector } from 'react-redux';
import {paymentCheck} from '../../redux-toolkit/clubLoginReducer'



function CheckoutSuccess() {

  const club = useSelector((state)=>state.club.clubDetails)
  const id = club._id
  const dispatch = useDispatch()
 
//   if (player != null) {
    // const email = player.data.email
    // console.log(email);
//   }
  // const email = player.data.email

  useEffect(() => {
    const fetchPlayer = async () => {
    //   if (player != null) {
        // console.log(player.data._id);
        // const id = player.data._id

        try {
          const response = await axiosClubsInstance.patch(`/edit-club/${id}`, { payment: true },
          { headers: { 'Authorization': `Bearer ${club.token}` }}
          )
          const data = response.data
          console.log(data);

          
         dispatch(paymentCheck(data))

        } catch (err) {
          console.log(err.message);
        }
    //   }

    }
    fetchPlayer()

  }, [])

  const navigate = useNavigate()
  const redirect = () => {

    setTimeout(() => {
      navigate('/club/players')
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
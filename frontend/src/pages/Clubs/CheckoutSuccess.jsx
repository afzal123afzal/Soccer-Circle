import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PaymentSuccess from '../../components/Clubs/util/PaymentSuccess';
import { axiosClubsInstance } from '../../instance/Axios';

import { useDispatch, useSelector } from 'react-redux';
import { paymentCheck } from '../../redux-toolkit/clubLoginReducer'



function CheckoutSuccess() {

  const club = useSelector((state) => state.club.clubDetails)
  const id = club._id
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchPlayer = async () => {

      try {
        const response = await axiosClubsInstance.patch(`/edit-club/${id}`, { payment: true },
          { headers: { 'Authorization': `Bearer ${club.token}` } }
        )
        const data = response.data

        dispatch(paymentCheck(data))

      } catch (err) {
        console.log(err.message);
      }

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
      <PaymentSuccess />
    </div>

  )
}

export default CheckoutSuccess
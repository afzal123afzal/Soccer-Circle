import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PaymentSuccess from '../../components/Players/util/PaymentSuccess';
import { axiosPlayersInstance } from '../../instance/Axios';
import { useDispatch, useSelector } from 'react-redux';
import { paymentCheck } from '../../redux-toolkit/playerLoginReducer';



function CheckoutSuccess() {
  const player = useSelector((state) => state.player.playerDetails)
  const id = player._id
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchPlayer = async () => {

      try {
        const response = await axiosPlayersInstance.patch(`/add-details/${id}`, { payment: true },
          { headers: { 'Authorization': `Bearer ${player.token}` } }
        )
        const data = response.data
        dispatch(paymentCheck(data))

      } catch (err) {
        console.log(err.message);
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
      <PaymentSuccess />
    </div>

  )
}

export default CheckoutSuccess
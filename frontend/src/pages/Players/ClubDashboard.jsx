import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
// import PlayerNavbar from '../../components/Players/PlayerNavbar'
import Nav from '../../components/Players/Nav'
import ClubProfileStatistics from '../../components/Players/ClubProfileStatistics'
import { axiosPlayersInstance } from '../../instance/Axios'
import './ClubDashboard.css'
import { useAuthContext } from '../../hooks/Player/useAuthContext'



function ClubDashboard() {
  const [club, setClub] = useState('')
  const [playerDetail, setPlayerDetail] = useState('')
  const location = useLocation()
  console.log(location.state)
  const clubDetail = location.state
  const { player } = useAuthContext()


  useEffect(() => {
    const fetchClub = async () => {
      try {
        // const response = await axiosPlayersInstance.post('/club', { email: clubDetail })
        const response = await axiosPlayersInstance.get(`/club/${clubDetail}`)
        console.log(response);
        if (response.status === 200) {
          setClub(response.data)
        }
      } catch (err) {
        console.log(err.message);
      }

    }
    fetchClub()
  }, [])

  useEffect(() => {
    const fetchPlayer = async () => {
      if (player != null) {
        console.log(player);
        const email = player.data.email

        try {
          const response = await axiosPlayersInstance.post('/player', { email: email })
          console.log(response.data[0].payment);
          if (response.status === 200) {
            setPlayerDetail(response.data[0])
          }

        } catch (err) {
          console.log(err.message);
        }
      }

    }
    fetchPlayer()

  }, [player])


  return (
    <div>
      {/* <PlayerNavbar/> */}
      <Nav />
      <div className='carousel' id="grad1"><span className='name-center'>{club.name}</span></div>

      {/* <div className="container1"> */}
      {/* <h1 className='dash'>PlayerDashboard</h1> */}
      <ClubProfileStatistics club={club} playerDetail={playerDetail} />
      {/* </div> */}
    </div>
  )
}

export default ClubDashboard
import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../../components/Players/Nav'
import ClubProfileStatistics from '../../components/Players/ClubProfileStatistics'
import { axiosPlayersInstance } from '../../instance/Axios'
import './ClubDashboard.css'
import { useSelector } from 'react-redux'
import PlayerFooter from '../../components/Players/PlayerFooter'



function ClubDashboard() {
  const [club, setClub] = useState('')
  const location = useLocation()
  const clubDetail = location.state
  const player = useSelector((state) => state.player.playerDetails)


  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await axiosPlayersInstance.get(`/club/${clubDetail}`,
          { headers: { 'Authorization': `Bearer ${player.token}` } }
        )
        if (response.status === 200) {
          setClub(response.data)
        }
      } catch (err) {
        console.log(err.message);
      }

    }
    fetchClub()
  }, [])

  return (
    <div>
      <Nav />
      <div className='carousel' id="grad1"><span className='name-center'>{club.name}</span></div>
      <ClubProfileStatistics club={club} playerDetails={player} />
      <PlayerFooter/>
    </div>
  )
}

export default ClubDashboard
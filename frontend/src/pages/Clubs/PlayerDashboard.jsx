import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { axiosClubsInstance } from '../../instance/Axios'
import './ClubDashboard.css'
import ClubNavbar from '../../components/Clubs/ClubNavbar'
import PlayerProfile from '../../components/Clubs/PlayerProfile'
import { useSelector } from 'react-redux'



function ClubDashboard() {
    const [player, setPlayer] = useState('')
    const location = useLocation()
    const playerDetail = location.state
    const club = useSelector((state) => state.club.clubDetails)


    useEffect(() => {
        const fetchClub = async () => {
            try {
                const response = await axiosClubsInstance.get(`/player/${playerDetail}`,
                { headers: { 'Authorization': `Bearer ${club.token}` }}
                )
                console.log(response);
                if (response.status === 200) {
                    setPlayer(response.data)
                }
            } catch (err) {
                console.log(err.message);
            }

        }
        fetchClub()
    }, [])

   
    return (
        <div>
            <ClubNavbar />
            <div className='carousel' id="grad1"><span className='name-center'>{player.name}</span></div>
            <PlayerProfile player={player} />
        </div>
    )
}

export default ClubDashboard
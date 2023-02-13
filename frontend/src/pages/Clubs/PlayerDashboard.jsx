import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
// import PlayerNavbar from '../../components/Players/PlayerNavbar'
import Nav from '../../components/Players/Nav'
import ClubProfileStatistics from '../../components/Players/ClubProfileStatistics'
import { axiosClubsInstance } from '../../instance/Axios'
import './ClubDashboard.css'
import { useAuthContext } from '../../hooks/Player/useAuthContext'
/////////////
import ClubNavbar from '../../components/Clubs/ClubNavbar'
import PlayerProfile from '../../components/Clubs/PlayerProfile'
//////////
import { useSelector } from 'react-redux'



function ClubDashboard() {
    const [player, setPlayer] = useState('')
    const location = useLocation()
    console.log(location.state)
    const playerDetail = location.state
    //   const { player } = useAuthContext()
    const clubDet = useSelector((state) => state.club.clubDetails)
    console.log(clubDet.email);
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

    //   useEffect(() => {
    //     const fetchPlayer = async () => {
    //       if (player != null) {
    //         console.log(player);
    //         const email = player.data.email

    //         try {
    //           const response = await axiosPlayersInstance.post('/player', { email: email })
    //           console.log(response.data[0].payment);
    //           if (response.status === 200) {
    //             setPlayerDetail(response.data[0])
    //           }

    //         } catch (err) {
    //           console.log(err.message);
    //         }
    //       }

    //     }
    //     fetchPlayer()

    //   }, [player])


    return (
        <div>
            {/* <PlayerNavbar/> */}
            <ClubNavbar />
            <div className='carousel' id="grad1"><span className='name-center'>{player.name}</span></div>

            {/* <div className="container1"> */}
            {/* <h1 className='dash'>PlayerDashboard</h1> */}
            <PlayerProfile player={player} />
            {/* </div> */}
        </div>
    )
}

export default ClubDashboard
import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
// import PlayerNavbar from '../../components/Players/PlayerNavbar'
import PlayerProfileStatistics from '../../components/Players/PlayerProfileStatistics'
import Nav from '../../components/Players/Nav'
import { axiosPlayersInstance } from '../../instance/Axios'
import { useAuthContext } from '../../hooks/Player/useAuthContext'
import { usePlayersContext } from '../../hooks/Player/usePlayersContext'
import EditForm from '../../components/Players/EditForm'
import './PlayerDashboard.css'


const PlayerDashboard = () => {

  const [edit, setEdit] = useState(false)
  const { players, dispatch } = usePlayersContext()
  const [playerDetails, setPlayerDetails] = useState(null)


  const { player } = useAuthContext()
  const email = player.data.email
  console.log(email);
  const id = player.data._id
  console.log(player.data._id);
  console.log(players);
  console.log(playerDetails);
  // console.log(players[0]);
  // const email = player.data
  // const location = useLocation()
  // console.log(location.state)
  // const clubDetail = location.state





  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axiosPlayersInstance.post('/player', { email: player.data.email })
        const obj = response.data
        console.log(obj);
        const Data = Object.values(obj).map((value) => {
          return value
        })
        //https://www.javascripttutorial.net/object/convert-an-object-to-an-array-in-javascript/
        console.log(Data);
        if (response.status === 200) {
          dispatch({ type: 'SET_PLAYERS', payload: obj })
          setPlayerDetails(obj)
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchPlayer()
  }, [dispatch, player,edit])

  

  const handleClick = () => {
    
    setEdit(true)

  }


    const editMode = () => {

      setEdit(false)
    }
   
  
 
 

  return (
    <div>
      {/* <PlayerNavbar/> */}
      <Nav />
      <div className='carousel' id="grad1"><span className='name-center'>{players !== null ? players[0].name : ''}</span></div>

      <div className="container1">
        {/* <h1 className='dash'>PlayerDashboard</h1> */}
        {/* <button className='align-middle' onClick={handleClick}>BUTTON</button> */}

        {edit ? <EditForm state={editMode} detail={email} _id={id}/> :
          <PlayerProfileStatistics key={player.data._id} edit={handleClick} user={players != null ? players : null} />}
        {/* <PlayerProfileStatistics key={1} user={players != null ? players : null} /> */}

        {/* <EditForm state={editMode}/> */}

      </div>
    </div>
  )
}

export default PlayerDashboard
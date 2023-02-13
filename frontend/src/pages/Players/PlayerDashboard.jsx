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
import { useDispatch, useSelector } from 'react-redux'
import { nameNav, playerProfile } from '../../redux-toolkit/playerLoginReducer'
import { toast } from 'react-toastify'


const PlayerDashboard = () => {

  const [edit, setEdit] = useState(false)
  // const { players, dispatch } = usePlayersContext()
  // const [playerDetails, setPlayerDetails] = useState(null)


  // const { player } = useAuthContext()
  // const email = player.data.email
  // console.log(email);
  // const id = player.data._id
  // console.log(player.data._id);
  // console.log(players);
  // console.log(playerDetails);
  // console.log(players[0]);
  // const email = player.data
  // const location = useLocation()
  // console.log(location.state)
  // const clubDetail = location.stplayer
  /////////////////
  const player = useSelector((state) => state.player.playerDetails)
  const playerSpec = useSelector((state) => state.player.playerSpec)
  console.log(playerSpec);
  const _id = player._id
  const dispatch = useDispatch()




  // useEffect(() => {
  //   fetchPlayer()
  //   console.log("hi");
  // }, [dispatch, player, edit])
  
  const fetchPlayer = async () => {
    try {
      // const response = await axiosPlayersInstance.post('/player', { email: player.data.email })
      const response = await axiosPlayersInstance.get(`/player/${_id}`)
      console.log(response.data);
      if (response.status === 200) {
        dispatch(playerProfile(response.data))
        dispatch(nameNav(response.data.name))
      }

      // const obj = response.data
      // console.log(obj);
      // const Data = Object.values(obj).map((value) => {
      //   return value
      // })
      //https://www.javascripttutorial.net/object/convert-an-object-to-an-array-in-javascript/
      // console.log(Data);
      // if (response.status === 200) {
      //   dispatch({ type: 'SET_PLAYERS', payload: obj })
      //   setPlayerDetails(obj)
      // }
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    fetchPlayer()
  }, [edit])

  const handleClick = () => {

    setEdit(true)

  }


  const editMode = () => {
    setEdit(false)
    toast.success("Updated Successfully")
  }





  return (
    <div>
      {/* <PlayerNavbar/> */}
      <Nav />
      <div className='carousel' id="grad1"><span className='name-center'>{playerSpec.name}</span></div>

      <div className="container1">
        {/* <h1 className='dash'>PlayerDashboard</h1> */}
        {/* <button className='align-middle' onClick={handleClick}>BUTTON</button> */}

        {/* {edit ? <EditForm state={editMode} detail={email} _id={id} /> :
          <PlayerProfileStatistics key={player.data._id} edit={handleClick} user={players != null ? players : null} />} */}
        {/* <PlayerProfileStatistics key={1} user={players != null ? players : null} /> */}

        {/* <EditForm state={editMode}/> */}

        {edit ? <EditForm state={editMode} _id={_id}  /> :
          <PlayerProfileStatistics player={playerSpec} playerAuth={player} edit={handleClick}  />}

      </div>
    </div>
  )
}

export default PlayerDashboard
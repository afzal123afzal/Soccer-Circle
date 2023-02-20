import React from 'react'
import { useEffect, useState } from 'react'
import PlayerProfileStatistics from '../../components/Players/PlayerProfileStatistics'
import Nav from '../../components/Players/Nav'
import { axiosPlayersInstance } from '../../instance/Axios'
import EditForm from '../../components/Players/EditForm'
import './PlayerDashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { nameNav, playerProfile } from '../../redux-toolkit/playerLoginReducer'
import { toast } from 'react-toastify'


const PlayerDashboard = () => {

  const [edit, setEdit] = useState(false)
  const player = useSelector((state) => state.player.playerDetails)
  const playerSpec = useSelector((state) => state.player.playerSpec)
  const _id = player._id
  const dispatch = useDispatch()

  const fetchPlayer = async () => {
    try {
      const response = await axiosPlayersInstance.get(`/player/${_id}`,
        { headers: { 'Authorization': `Bearer ${player.token}` } }
      )
      if (response.status === 200) {
        dispatch(playerProfile(response.data))
        dispatch(nameNav(response.data.name))
      }
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
      <Nav />
      <div className='carousel' id="grad1"><span className='name-center'>{playerSpec.name}</span></div>
      <div className="container1">
        {edit ? <EditForm state={editMode} playerAuth={player} _id={_id} /> :
          <PlayerProfileStatistics player={playerSpec} playerAuth={player} edit={handleClick} />}

      </div>
    </div>
  )
}

export default PlayerDashboard
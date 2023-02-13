import { useEffect, useState } from 'react'
import { usePlayersContext } from '../../hooks/Player/usePlayersContext'
import { useAuthContext } from '../../hooks/Player/useAuthContext'
import PlayerNavbar from '../../components/Players/PlayerNavbar'
import { Link } from 'react-router-dom'
import Nav from '../../components/Players/Nav'
import PlayerFooter from '../../components/Players/PlayerFooter'
import './ClubFind.css'



// components
import PlayerDetails from '../../components/Players/PlayerDetails'
// import WorkoutForm from '../components/WorkoutForm'
import { axiosPlayersInstance } from '../../instance/Axios'
import ClubCard from '../../components/Players/ClubCards'
import Filter from '../../components/Players/util/Filter'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'



const PlayersFind = () => {
  // const { players, dispatch } = usePlayersContext()
  const [players,setPlayers] = useState('')
  const [filterObjects, setFilterObjects] = useState('')
  // const { player } = useAuthContext()
  const player = useSelector((state)=>state.player.playerDetails)

  useEffect(() => {
    const fetchClubs = async () => {

      try {
        const response = await axiosPlayersInstance.get("/clubs"
          , { headers: { 'Authorization': `Bearer ${player.token}` },
        params:{
          payment:true
        }
        }
        );
        console.log(response);
        if (response.status === 200) {
          // dispatch({ type: 'SET_PLAYERS', payload: response.data })
          setPlayers(response.data)
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchClubs()


    // if (player) {
    //   console.log(player.data.token);
    //   fetchClubs()
    // }
  }, [ player])
  console.log(players);

  const filterHandler = async (datas) => {
    console.log(datas, "Data");
    const response = await axiosPlayersInstance.get('/clubs', {
      headers: { 'Authorization': `Bearer ${player.token}` },
      params: datas
    })
    console.log(response.data, response);
    if (JSON.stringify(response.data) === JSON.stringify([])) {
      toast.error("Clubs Not Found")
    }
    console.log(response);
    setFilterObjects(response.data)

  }

  return (
    <div className="workouts">
      <Nav />
      <div className='carousel' id="grad1">Clubs</div>
      <div className="playersOne ">
        <Filter filter={(datas) => filterHandler(datas)} />
      </div>

      {filterObjects !== "" ? <div className="players">
        {filterObjects && filterObjects.map((p) => (
          // <PlayerDetails key={p.email} player={p} />
          <ClubCard key={p.email} club={p} />
        ))}</div> : <div className="players">
        {players && players.map((p) => (
          // <PlayerDetails key={p.email} player={p} />
          <ClubCard key={p.email} club={p} />
        ))}
      </div>}




      <>
        <PlayerFooter />
      </>

    </div>
  )
}

export default PlayersFind
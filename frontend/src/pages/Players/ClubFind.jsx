import { useEffect } from 'react'
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



const PlayersFind = () => {
  const { players, dispatch } = usePlayersContext()
  const { player } = useAuthContext()

  useEffect(() => {
    const fetchClubs = async () => {

      try {
        const response = await axiosPlayersInstance.get("/clubs"
          // ,{  headers: { 'Authorization': `Bearer ${player.data.token}` }}
        );
        console.log(response);
        if (response.status === 200) {
          dispatch({ type: 'SET_PLAYERS', payload: response.data })
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
  }, [dispatch, player])
  console.log(players);

  return (
    <div className="workouts">
      <Nav />
      <div className='carousel' id="grad1">Clubs</div>
      <div className="players">
        {players && players.map((p) => (
          // <PlayerDetails key={p.email} player={p} />

          <ClubCard key={p.email} club={p} />
        ))}
      </div>
      <>
      <PlayerFooter/>
      </>
      
    </div>
  )
}

export default PlayersFind
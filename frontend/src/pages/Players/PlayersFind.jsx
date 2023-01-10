import { useEffect } from 'react'
import { usePlayersContext} from '../../hooks/Player/usePlayersContext'
import { useAuthContext} from '../../hooks/Player/useAuthContext'
import PlayerNavbar from '../../components/Players/PlayerNavbar'
import './PlayersFind.css'



// components
import PlayerDetails from '../../components/Players/PlayerDetails'
// import WorkoutForm from '../components/WorkoutForm'
import { axiosPlayersInstance } from '../../instance/Axios'

const PlayersFind = () => {
  const {players, dispatch } = usePlayersContext()
  const { player } = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {

      try {
        const response = await axiosPlayersInstance.get("/clubs", {
          headers: { 'Authorization': `Bearer ${player.data.token}` }
        });
        console.log(response);
        if (response.status === 200) {
          dispatch({ type: 'SET_PLAYERS', payload: response.data })
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    if (player) {
      console.log(player.data.token);
      fetchWorkouts()
    }
  }, [dispatch, player])
  console.log(players);

  return (
    <div className="workouts">
      <PlayerNavbar/>
      <div className="players">
        {players&& players.map((p) => (
          <PlayerDetails key={p.email} player={p} />
        ))}
      </div>
     </div>
  )
}

export default PlayersFind
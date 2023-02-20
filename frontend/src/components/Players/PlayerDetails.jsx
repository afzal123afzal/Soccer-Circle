

import './PlayerDetails.css'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PlayerDetails = ({ player }) => {

  return (

    <div className="workout-details">
      <div className="card">
        <div className="card-border-top">
        </div>
        <div className="img">
        </div>
        <span> {player.name}</span>
        <p className="job"> {player.email}</p>
        <button> Connect
        </button>
      </div>
    </div>




  )

}
export default PlayerDetails
{/* <div className="workout-details"> */ }
{/* <h4>{player.name}</h4> */ }
{/* <p><strong>Load (kg): </strong>{workout.load}</p>
<p><strong>Reps: </strong>{workout.reps}</p> */}
{/* <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p> */ }
{/* </div> */ }
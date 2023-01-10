// import './PlayerDetails.css'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ClubDetails = ({ club }) => {

  return (

    <div className="workout-details">
      <div className="card">
        <div className="card-border-top">
        </div>
        <div className="img">
        </div>
        <span> {club.name}</span>
        <p className="job"> {club.email}</p>
        <button> Connect
        </button>
      </div>
    </div>




  )

}
export default ClubDetails
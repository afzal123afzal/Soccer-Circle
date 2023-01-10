import { useEffect } from "react"
import { useClubsContext} from '../../hooks/Club/useClubsContext'
import { useClubAuthContext } from "../../hooks/Club/useClubAuthContext"
import { axiosClubsInstance } from "../../instance/Axios"

// components
import ClubDetails from "../../components/Clubs/ClubDetails"
import ClubNavbar from "../../components/Clubs/ClubNavbar"
// import WorkoutForm from "../components/WorkoutForm"

const ClubFindPlayers = () => {
  const { clubs, dispatch } =  useClubsContext()
  const {club} = useClubAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {

        try {
          const response = await axiosClubsInstance.get("/clubs", {
            headers: { 'Authorization': `Bearer ${club.data.token}` }
          });
          console.log(response);
          if (response.status === 200) {
            dispatch({ type: 'SET_CLUBS', payload: response.data })
          }
        } catch (err) {
          console.log(err);
        }
      }
  
      if (club) {
        console.log(club.data.token);
        fetchWorkouts()
      }

   
  }, [dispatch,club])

  return (
    <div className="home">
      <ClubNavbar/>
      <h2>Club Home</h2>
      <div className="workouts">
        {clubs && clubs.map(c => (
          <ClubDetails club={c} key={c._id} />
        ))}
      </div>
     
    </div>
  )
}

export default ClubFindPlayers
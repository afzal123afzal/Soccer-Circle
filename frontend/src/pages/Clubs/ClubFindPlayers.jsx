import { useEffect,useState } from "react"
import { useClubsContext} from '../../hooks/Club/useClubsContext'
import { useClubAuthContext } from "../../hooks/Club/useClubAuthContext"
import { axiosClubsInstance } from "../../instance/Axios"

// components
import PlayerCard from "../../components/Clubs/PlayerCard"
import ClubNavbar from "../../components/Clubs/ClubNavbar"
// import WorkoutForm from "../components/WorkoutForm"

const ClubFindPlayers = () => {
  // const { clubs, dispatch } =  useClubsContext()
  const [clubs,setClubs] = useState('')
  const {club} = useClubAuthContext()

  useEffect(() => {
    const fetchClubs = async () => {

      try {
        const response = await axiosClubsInstance.get("/players"
        //  ,{ headers: { 'Authorization': `Bearer ${club.data.token}` }}
        );
        console.log(response);
        if (response.status === 200) {
          // dispatch({ type: 'SET_CLUBS', payload: response.data })
          setClubs(response.data)
        }
      } catch (err) {
        console.log(err);
      }
    }
  
      // if (club) {
      //   console.log(club.data.token);
      //   fetchClubs()
      // }
      fetchClubs()

  }, [club])
  console.log(clubs,"ClubFInd");


  return (
    <div className="home">
      <ClubNavbar/>
      <div className='carousel' id="grad1">Players</div>
      <div className="players">
        {clubs && clubs.map(c => (
          <PlayerCard player={c} key={c._id} />
        ))}
      </div>
     
    </div>
  )
}

export default ClubFindPlayers
import { useEffect, useState } from "react"
import { axiosClubsInstance } from "../../instance/Axios"

// components
import './ClubFindPlayers.css'
import PlayerCard from "../../components/Clubs/PlayerCard"
import ClubNavbar from "../../components/Clubs/ClubNavbar"
import Filter from "../../components/Clubs/util/Filter"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import ClubFooter from "../../components/Clubs/ClubFooter"

const ClubFindPlayers = () => {
  const [clubs, setClubs] = useState('')
  const [filterObjects, setFilterObjects] = useState('')
  const club = useSelector((state) => state.club.clubDetails)


  useEffect(() => {
    const fetchClubs = async () => {

      try {
        const response = await axiosClubsInstance.get("/players"
          , {
            headers: { 'Authorization': `Bearer ${club.token}` },
            params: {
              payment: true,
              blockStatus: false
            }
          }
        );
        console.log(response);
        if (response.status === 200) {
          setClubs(response.data)
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchClubs()

  }, [club])

  const filterHandler = async (data) => {
    console.log(data, "Data");
    const response = await axiosClubsInstance.get('/players', {
      headers: { 'Authorization': `Bearer ${club.token}` },
      params: data
    })
    console.log(response.data, response);
    if (JSON.stringify(response.data) === JSON.stringify([])) {
      toast.error("Players Not Found")
    }
    setFilterObjects(response.data)

  }




  return (
    <div className="home">
      <ClubNavbar />
      <div className='carousel' id="grad1">Players</div>
      <div className="playersOne">
        <Filter filter={(data) => filterHandler(data)} />
      </div>

      {filterObjects !== "" ? <div className="players">
        {filterObjects && filterObjects.map(c => (
          <PlayerCard player={c} key={c._id} />
        ))}
      </div> : <div className="players">
        {clubs && clubs.map(c => (
          <PlayerCard player={c} key={c._id} />
        ))}
      </div>}
      <ClubFooter />

    </div>

  )
}

export default ClubFindPlayers
import { useEffect, useState } from 'react'
import Nav from '../../components/Players/Nav'
import PlayerFooter from '../../components/Players/PlayerFooter'
import './ClubFind.css'
// import '../../components/Players/PlayerNavbar.css'

// components
import { axiosPlayersInstance } from '../../instance/Axios'
import ClubCard from '../../components/Players/ClubCards'
import Filter from '../../components/Players/util/Filter'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'



const PlayersFind = () => {
  const [players, setPlayers] = useState('')
  const [filterObjects, setFilterObjects] = useState('')
  const player = useSelector((state) => state.player.playerDetails)

  useEffect(() => {
    const fetchClubs = async () => {

      try {
        const response = await axiosPlayersInstance.get("/clubs"
          , {
            headers: { 'Authorization': `Bearer ${player.token}` },
            params: {
              payment: true,
              blockStatus:false
            }
          }
        );
        if (response.status === 200) {
          setPlayers(response.data)
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchClubs()
  }, [player])

  const filterHandler = async (datas) => {
    const response = await axiosPlayersInstance.get('/clubs', {
      headers: { 'Authorization': `Bearer ${player.token}` },
      params: datas
    })
    if (JSON.stringify(response.data) === JSON.stringify([])) {
      toast.error("Clubs Not Found")
    }
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
          <ClubCard key={p.email} club={p} />
        ))}</div> : <div className="players">
        {players && players.map((p) => (
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
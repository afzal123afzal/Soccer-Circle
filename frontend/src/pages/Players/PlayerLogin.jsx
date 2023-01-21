import { Fragment } from "react"
// import { useLogin } from "../../hooks/Player/useLogin"
import './PlayerSignup.css'
import PlayerNavbar from '../../components/Players/PlayerNavbar'
import Nav from "../../components/Players/Nav"
// import PlayerLoginForm from "../../components/Players/PlayerLoginForm"
import PlayerLogin1 from "../../components/Players/PlayerLogin1"

const PlayerLogin = () => {


  return (
    
      <div  >
      {/* <PlayerNavbar/> */}
      <Nav/>
      {/* <PlayerLoginForm /> */}
      <PlayerLogin1/>
      </div>
    
  )
}

export default PlayerLogin
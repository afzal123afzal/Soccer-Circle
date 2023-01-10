import { Fragment } from "react"
// import { useLogin } from "../../hooks/Player/useLogin"
import './PlayerSignup.css'
import PlayerNavbar from '../../components/Players/PlayerNavbar'
import PlayerLoginForm from "../../components/Players/PlayerLoginForm"

const PlayerLogin = () => {


  return (
    
      <div className="container" >
      <PlayerNavbar/>
      <PlayerLoginForm />
      </div>
    
  )
}

export default PlayerLogin
import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/Player/useLogout'
import { useAuthContext } from '../../hooks/Player/useAuthContext'
import './PlayerNavbar.css'

const PlayerNavbar = () => {
  const { logout } = useLogout()
  const { player } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/player/home">
          <h1>Soccer Circle</h1>
        </Link>
        <nav>
          {player && (
            <div>
              <span>{player.data.name}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!player && (
            <div>
              <Link to="/player/login">Login</Link>
              <Link to="/player/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default PlayerNavbar
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
        <Link to="/user/home">
          <h1>Players Connect</h1>
        </Link>
        <nav>
          {player && (
            <div>
              <span>{player.data.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!player && (
            <div>
              <Link to="/user/login">Login</Link>
              <Link to="/user/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default PlayerNavbar
import { Link } from 'react-router-dom'
import './ClubNavbar.css'
import { useClubLogout } from '../../hooks/Club/useClubLogout'
import { useClubAuthContext } from '../../hooks/Club/useClubAuthContext'

const ClubNavbar = () => {
  const { logout } = useClubLogout()
  const { club } = useClubAuthContext()
  const handleClick = () => {
    logout()
  }
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Club Connects</h1>
        </Link>
        <nav>
          {club && (
            <div>
              <span>{club.data.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!club && (
            < div >
              <Link to="/club/login">Login</Link>
              <Link to="/club/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div >
    </header >
  )
}

export default ClubNavbar
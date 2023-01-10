import { useState } from "react"
import { useClubLogin } from "../../hooks/Club/useClubLogin"
import './ClubSignup.css'
import ClubNavbar from "../../components/Clubs/ClubNavbar"

const ClubLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useClubLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    login(email, password)
    console.log(email, password)
  }

  return (
    <div>
      <ClubNavbar/>
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default ClubLogin
import { useState } from "react"
import { useSignup } from "../../hooks/Player/useSignup"
import './PlayerSignup.css'
import PlayerNavbar from '../../components/Players/PlayerNavbar'
import Nav from "../../components/Players/Nav"

const PlayerSignup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(name, email, mobile, password)
    console.log(name, email, mobile, password)
  }

  return (
    <div>
      {/* <PlayerNavbar/> */}
      <Nav />
      <form className="login" onSubmit={handleSubmit}>
        <h3>Signup</h3>

        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>Email address:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Mobile:</label>
        <input
          type="number"
          onChange={(e) => setMobile(e.target.value)}
          value={mobile}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default PlayerSignup
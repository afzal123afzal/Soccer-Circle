import { useState } from "react"
import { useClubSignup } from "../../hooks/Club/useClubSignup"
import './ClubSignup.css'
import ClubNavbar from "../../components/Clubs/ClubNavbar"

const ClubSignup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [regNo, setRegNo] = useState('')
  const { signup, error, isLoading } = useClubSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(name, email, mobile, password, regNo)
    console.log(name, email, password, mobile, regNo)
  }

  return (
    <div>
      <ClubNavbar />
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

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
        <label>Reg No:</label>
        <input
          type="text"
          onChange={(e) => setRegNo(e.target.value)}
          value={regNo}
        />

        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default ClubSignup
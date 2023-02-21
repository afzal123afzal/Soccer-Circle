import { useState } from "react"
import { useClubSignup } from "../../hooks/Club/useClubSignup"
import './ClubSignup.css'
import ClubNavbar from "../../components/Clubs/ClubNavbar"


const ClubSignup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [regNo, setRegNo] = useState('')
  const { signup, error, isLoading, success } = useClubSignup()



  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await signup(name, email, mobile, password, confirmPassword, regNo)
    if (response === "success") {
      setName("")
      setEmail("")
      setMobile("")
      setPassword("")
      setConfirmPassword("")
      setRegNo("")
    }


  }

  return (
    <div>
      <ClubNavbar />
      <form className="login" onSubmit={handleSubmit}>
        <h3 className="text-header-signup">Sign Up</h3>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

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
        <label>Confirm Password:</label>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <label>Reg No:</label>
        <input
          type="text"
          onChange={(e) => setRegNo(e.target.value)}
          value={regNo}
        />

        <button className="button-signup" disabled={isLoading}>Sign up</button>
      </form>
    </div>
  )
}

export default ClubSignup
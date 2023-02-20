import { useState } from "react"
import { useSignup } from "../../hooks/Player/useSignup"
import './PlayerSignup.css'
import Nav from "../../components/Players/Nav"


const PlayerSignup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { signup, error, isLoading,success } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(name, email, mobile, password,confirmPassword)
    
  }

  return (
    <div>
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
         <label>Confirm Password:</label>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />

        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  )
}

export default PlayerSignup
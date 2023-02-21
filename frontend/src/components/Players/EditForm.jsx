
import React, { useEffect, useState } from 'react'
import { axiosPlayersInstance } from '../../instance/Axios';
function EditForm({ state, _id, playerAuth }) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [age, setAge] = useState('')
  const [position, setPosition] = useState('')
  const [video,setVideo] = useState('')
  const [club, setClub] = useState('')
  const [place, setPlace] = useState('')

  useEffect(() => {
    try {
      const userInfo = async () => {
        const response = await axiosPlayersInstance.get(`/player/${_id}`,
          { headers: { 'Authorization': `Bearer ${playerAuth.token}` } }
        )
        setName(response.data.name)
        setEmail(response.data.email)
        setMobile(response.data.mobile)
        setAge(response.data.age)
        setPosition(response.data.position)
        setClub(response.data.club)
        setPlace(response.data.place)
        setVideo(response.data.video)
      }
      userInfo()

    } catch (err) {
      console.log(err.message);
    }

  }, [])
  const updateDetails = async () => {
    try {
      const data = { name, email, mobile, age, position, club, place,video }
      const response = await axiosPlayersInstance.patch(`/add-details/${_id}`, data,
        { headers: { 'Authorization': `Bearer ${playerAuth.token}` } }
      )
    } catch (err) {
      console.log(err.message);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    await updateDetails()

    state()
  }

  return (
    <div>

      <form className="login" onSubmit={handleSubmit} >
        <h2>Edit Details</h2>

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
        <label>Place:</label>
        <input
          type="text"
          onChange={(e) => setPlace(e.target.value)}
          value={place}
        />
          <label>Video:</label>
        <input
          type="text"
          onChange={(e) => setVideo(e.target.value)}
          value={video}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(e) => setPosition(e.target.value)}
          value={position}
        />
        <label>Club:</label>
        <input
          type="text"
          onChange={(e) => setClub(e.target.value)}
          value={club}
        />
        <button >Update</button>
      </form>
    </div>
  )
}

export default EditForm

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosPlayersInstance } from '../../instance/Axios';
function EditForm(props) {
  console.log(props._id);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [age, setAge] = useState('')
  const [position, setPosition] = useState('')
  const [club, setClub] = useState('')
  const [place, setPlace] = useState('')

  useEffect(() => {
    try {
      const userInfo = async () => {
        const response = await axiosPlayersInstance.post('/player', { email: props.detail })
        console.log(response);
        setName(response.data[0].name)
        setEmail(response.data[0].email)
        setMobile(response.data[0].mobile)
        setAge(response.data[0].age)
        setPosition(response.data[0].position)
        setClub(response.data[0].club)
        setPlace(response.data[0].place)
      }
      userInfo()

    } catch (err) {
      console.log(err.message);
    }

  }, [])
  const updateDetails = async ()=>{
    console.log("hi");
    try{
      const data = {name,email,mobile,age,position,club,place}
      const response = await axiosPlayersInstance.patch('/add-details/'+props._id,data)
      console.log(response);
    }catch(err){
      console.log(err.message);
    }
  }
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    
     updateDetails()
     
     props.state()
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
        {/* <button disabled={isLoading}>Sign up</button>  */}
        {/* {error && <div className="error">{error}</div>} */}
      </form>

      {/* <h2>{props.detail}</h2>
      <button onClick={props.state}>Register1</button> */}
    </div>
  )
}

export default EditForm
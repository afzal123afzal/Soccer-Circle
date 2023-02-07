
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosClubsInstance } from '../../instance/Axios';
function ClubEditForm(props) {
  console.log(props._id);
  const _id = props._id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [regNo, setRegNo] = useState('')
  const [place, setPlace] = useState('')

  useEffect(() => {
    try {
      const userInfo = async () => {
        const response = await axiosClubsInstance.get(`${_id}`)
        console.log(response.data);
        setName(response.data.name)
        setEmail(response.data.email)
        setMobile(response.data.mobile)
        setRegNo(response.data.regNo)
        setPlace(response.data.place)
      }
      userInfo()

    } catch (err) {
      console.log(err.message);
    }

  }, [])
  const updateDetails = async ()=>{
    console.log("hi");
    try{
      const data = {name,email,mobile,regNo,place}
      const response = await axiosClubsInstance.patch(`/edit-club/${_id}`,data)
      console.log(response);
    }catch(err){
      console.log(err.message);
    }
  }
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    
     await updateDetails()
     
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
        <label>RegNo:</label>
        <input
          type="text"
          onChange={(e) => setRegNo(e.target.value)}
          value={regNo}
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

export default ClubEditForm
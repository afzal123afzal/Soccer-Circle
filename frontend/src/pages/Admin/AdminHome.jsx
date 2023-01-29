import React from 'react'
import AdminNav from '../../components/Admin/AdminNav'
import { loginAdmin } from '../../redux-toolkit/loginReducer'
import { useDispatch } from 'react-redux'

function AdminHome() {
  const dispatch = useDispatch()
//  const handleClick = ()=>{
//   dispatch(loginAdmin(1))
//  }


  return (
    <div>
      <AdminNav/>
      <h2>AdminHome  </h2>
      {/* <button onClick={handleClick}>login</button> */}
      </div>
  )
}

export default AdminHome
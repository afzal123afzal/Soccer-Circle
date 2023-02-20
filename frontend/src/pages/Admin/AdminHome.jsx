import React from 'react'
import AdminNav from '../../components/Admin/AdminNav'
import { loginAdmin } from '../../redux-toolkit/loginReducer'
import { useDispatch } from 'react-redux'
import AdminBox from '../../components/Admin/util/AdminBox'

function AdminHome() {
  const dispatch = useDispatch()
//  const handleClick = ()=>{
//   dispatch(loginAdmin(1))
//  }


  return (
    <div>
      <AdminNav/>
      <h2 style={{textAlign:'center',marginTop:'20px'}}>Dashboard  </h2>
      <AdminBox/>
      {/* <button onClick={handleClick}>login</button> */}
      </div>
  )
}

export default AdminHome
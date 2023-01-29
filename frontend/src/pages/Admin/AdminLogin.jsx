import React from 'react'
import AdminLoginForm from '../../components/Admin/AdminLoginForm'
import LoginNav from '../../components/Admin/LoginNav'
import { useSelector } from 'react-redux'

function AdminLogin() {
  
  return (
    <div>
      <LoginNav/>
      <>
      <AdminLoginForm/>
      </>
      </div>
  )
}

export default AdminLogin
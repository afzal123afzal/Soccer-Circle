import React from 'react'
import { Link } from 'react-router-dom'

function AdminBox() {
  return (
    <div className="m-12">
    <div className="flex  justify-around  flex-wrap ">
      <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
        <div className='flex-row'>
        <p className='text-3xl mt-3 font-bold text-center'>0</p>
        <p className='text-lg pb-1h font-semibold'>Users</p>
        </div>
      </div>
      <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
        <div className='flex-row'>
      <p className='text-3xl mt-3  font-bold text-center'>0</p>
      <p className='text-lg pb-1 font-semibold'>Experts</p>
      </div>
        </div>
        <Link to={''}><div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
        <div className='flex-row'>
      <p className='text-3xl mt-3 font-bold text-center'>0</p>
      <p className='text-lg pb-1 font-semibold'>Video Pending Approvals</p>
      </div>
        </div></Link>
        <Link to={''}> <div  className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg hover:cursor-pointer">
        <div className='flex-row'>
      <p className='text-3xl mt-3 font-bold text-center'>0</p>
      <p className='text-lg pb-1 font-semibold '>Expert Pending Approval</p>
      </div>
        </div></Link>

    
    </div>
    
  </div>
  )
}

export default AdminBox
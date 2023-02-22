import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { axiosAdminInstance } from '../../../instance/Axios'

function AdminBox() {

  const [playersCount, setPlayersCount] = useState('')
  const [paidPlayersCount, setPaidPlayersCount] = useState('')
  const [clubsCount, setClubsCount] = useState('')
  const [paidClubsCount, setPaidClubsCount] = useState('')
  const [blockedPlayers, setBlockedPlayers] = useState('')
  const [blockedClubs, setBlockedClubs] = useState('')
  const [playerRevenue, setPlayerRevenue] = useState('')
  const [clubRevenue, setClubRevenue] = useState('')

  const getPlayers = async () => {
    const { data } = await axiosAdminInstance.get('/players/count')
    setPlayersCount(data)
  }
  const getPaidPlayers = async () => {
    const { data } = await axiosAdminInstance.get('/players/count', {
      params: {
        payment: true
      }
    })
    setPaidPlayersCount(data)
  }
  const getClubs = async () => {
    const { data } = await axiosAdminInstance.get('/clubs/count')
    setClubsCount(data)

  }

  const getPaidClubs = async () => {
    const { data } = await axiosAdminInstance.get('/clubs/count', {
      params: {
        payment: true
      }
    })
    setPaidClubsCount(data)

  }

  const getBlockedPlayers = async () => {
    const { data } = await axiosAdminInstance.get('/players/count', {
      params: {
        blockStatus: true
      }
    })
    setBlockedPlayers(data)

  }

  const getBlockedClubs = async () => {
    const { data } = await axiosAdminInstance.get('/clubs/count', {
      params: {
        blockStatus: true
      }
    })
    setBlockedClubs(data)

  }

  const getPlayerRevenue = async () => {
    const { data } = await axiosAdminInstance.get('/players/count', {
      params: {
        payment: true
      }
    })
    setPlayerRevenue(data*499)

  }

  const getClubRevenue = async () => {
    const { data } = await axiosAdminInstance.get('/clubs/count', {
      params: {
        payment: true
      }
    })
    setClubRevenue(data*499)

  }

  useEffect(() => {
    getPlayers()
    getPaidPlayers()
    getClubs()
    getPaidClubs()
    getBlockedPlayers()
    getPaidClubs()
    getBlockedClubs()

  }, [playersCount, getPaidPlayers, clubsCount, paidClubsCount, blockedPlayers, blockedClubs])

  useEffect(()=>{
    getPlayerRevenue()
    getClubRevenue()
  },[playerRevenue,clubRevenue])

  return (
    <div className="m-12">
      <div className="flex  justify-around  flex-wrap ">
        <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
          <div className='flex-row'>
            <p className='text-3xl mt-3 font-bold text-center'>{playersCount ? playersCount : 0}</p>
            <p className='text-lg pb-1h font-semibold'>Players</p>
          </div>
        </div>
        <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
          <div className='flex-row'>
            <p className='text-3xl mt-3  font-bold text-center'>{paidPlayersCount ? paidPlayersCount : 0}</p>
            <p className='text-lg pb-1 font-semibold'>Paid Players</p>
          </div>
        </div>
        <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
          <div className='flex-row'>
            <p className='text-3xl mt-3 font-bold text-center'>{clubsCount ? clubsCount : 0}</p>
            <p className='text-lg pb-1 font-semibold'>Clubs</p>
          </div>
        </div>
        <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg hover:cursor-pointer">
          <div className='flex-row'>
            <p className='text-3xl mt-3 font-bold text-center'>{paidClubsCount ? paidClubsCount : 0}</p>
            <p className='text-lg pb-1 font-semibold '>Paid Clubs</p>
          </div>
        </div>
        <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg hover:cursor-pointer">
          <div className='flex-row'>
            <p className='text-3xl mt-3 font-bold text-center'>{blockedPlayers ? blockedPlayers : 0}</p>
            <p className='text-lg pb-1 font-semibold '>Blocked Players</p>
          </div>
        </div>
        <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg hover:cursor-pointer">
          <div className='flex-row'>
            <p className='text-3xl mt-3 font-bold text-center'>{blockedClubs ? blockedClubs : 0}</p>
            <p className='text-lg pb-1 font-semibold '>Blocked Clubs</p>
          </div>
        </div>

        <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg hover:cursor-pointer">
          <div className='flex-row'>
            <p className='text-3xl mt-3 font-bold text-center'>₹ {playerRevenue ? playerRevenue : 0}</p>
            <p className='text-lg pb-1 font-semibold '>Player Revenue</p>
          </div>
        </div>

        <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg hover:cursor-pointer">
          <div className='flex-row'>
            <p className='text-3xl mt-3 font-bold text-center'>₹ {clubRevenue ? clubRevenue : 0}</p>
            <p className='text-lg pb-1 font-semibold '>Club Revenue</p>
          </div>
        </div>


      </div>

    </div>
  )
}

export default AdminBox
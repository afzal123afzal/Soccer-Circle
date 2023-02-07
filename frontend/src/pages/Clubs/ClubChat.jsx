import React from 'react'
import { useLocation } from 'react-router-dom'
import ChatBoxClub from '../../components/Clubs/ChatBoxClub'
import ClubNavbar from '../../components/Clubs/ClubNavbar'


function ClubChat() {
const location = useLocation()
console.log(location.state);


  return (
    <div>
        <ClubNavbar/>
        <ChatBoxClub/>
    </div>
  )
}

export default ClubChat
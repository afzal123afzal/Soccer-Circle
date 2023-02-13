
import React from 'react'
import { useSelector } from 'react-redux'
import ClubNavbar from '../../components/Clubs/ClubNavbar'
import Carousel from '../../components/Players/util/Carousel'


function Home() {
  const club = useSelector((state)=>state.club.clubDetails)
  return (
    <div>
        <ClubNavbar/>
        <Carousel/>
    </div>
  )
}

export default Home
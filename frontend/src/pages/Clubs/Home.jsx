import React from 'react'
import ClubNavbar from '../../components/Clubs/ClubNavbar'
import Carousel from '../../components/Players/util/Carousel'
import Cards from '../../components/Clubs/Home/Cards'
import ClubFooter from '../../components/Clubs/util/ClubFooter'


function Home() {
  return (
    <div>
        <ClubNavbar/>
        <Carousel/>
        <Cards/>
        <ClubFooter/>
    </div>
  )
}

export default Home
import React from 'react'
import Nav from '../../components/Players/Nav'
import Carousel from '../../components/Players/util/Carousel'
import './Home.css'
import Cards from '../../components/Players/Home/Cards'
import PlayerFooter from '../../components/Players/PlayerFooter'


function Home() {

    return (
        <div >
            <Nav />
            <Carousel />
            <Cards />
            <PlayerFooter />
        </div>
    )
}

export default Home
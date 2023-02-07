import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../../components/Players/Nav'
import PlayerForm from '../../components/Players/util/PlayerForm'
import Carousel from '../../components/Players/util/Carousel'
import Form from '../../components/Players/util/Form'
import './Home.css'
////////////



function Home() {

    return (
        <div >
            <Nav />
            <Carousel />
        </div>
    )
}

export default Home
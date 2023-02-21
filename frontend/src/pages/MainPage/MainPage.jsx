import React from 'react'
import MainPageNav from '../../components/MainPage/MainPageNav'
import Cards from '../../components/MainPage/Home/Cards'
import MainPageFooter from '../../components/MainPage/MainPageFooter'


const MainPage = () => {
  return (
    <div>
        <MainPageNav/>
        <Cards/>
        <MainPageFooter/>
    </div>
  )
}

export default MainPage
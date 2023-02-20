import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

//////////pages and components
import PlayerLogin from '../../pages/Players/PlayerLogin'
import PlayerSignup from '../../pages/Players/PlayerSignup'
import ClubFind from '../../pages/Players/ClubFind'
import ClubDashboard from '../../pages/Players/ClubDashboard'
import Home from '../../pages/Players/Home'
import PlayerDashboard from '../../pages/Players/PlayerDashboard'
import CheckoutSuccess from '../../pages/Players/CheckoutSuccess'
import Chat from '../../pages/Players/Chat'
import { useSelector } from 'react-redux'
import ErrorPage from '../../pages/Players/ErrorPage'
import SignUpVerify from '../../pages/Players/SignUpVerify'



function PlayerRoutes() {
  const player = useSelector((state) => state.player.playerDetails)
  return (
    <div>
      <div className="pages">
        <Routes>
          <Route
            path="/chat"
            element={player ? <Chat /> : <Navigate to="/player/login" />}
          />
          <Route
            path="/clubs"
            element={player ? <ClubFind /> : <Navigate to="/player/login" />}
          />
          <Route
            path="/dashboard"
            element={player ? <PlayerDashboard /> : <Navigate to="/player/login" />}
          />
          <Route
            path="/club"
            element={player ? <ClubDashboard /> : <Navigate to="/player/login" />}
          /><Route
            path="/checkout-success"
            element={<CheckoutSuccess />}
          />
          <Route
            path="/home"
            element={player ? <Home /> : <Navigate to="/player/login" />}
          />
          <Route
            path="/"
            element={player ? <Home /> : <Navigate to="/player/login" />}
          />
          <Route
            path="/signup"
            element={!player ? <PlayerSignup /> : <Navigate to="/player/home" />}
          />
          <Route
            path="/login"
            element={!player ? <PlayerLogin /> : <Navigate to="/player/home" />}
          />
          <Route
            path="/verify/:token"
            element={<SignUpVerify/> }
          />
          <Route path="*" element={<ErrorPage />} />


        </Routes>
      </div>
    </div>
  )
}

export default PlayerRoutes


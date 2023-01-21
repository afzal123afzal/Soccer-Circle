import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//////////pages and components
import PlayerNavbar from '../../components/Players/PlayerNavbar'
import PlayerLogin from '../../pages/Players/PlayerLogin'
import PlayersHome from '../../pages/Players/PlayersHome'
import PlayerSignup from '../../pages/Players/PlayerSignup'
import ClubFind from '../../pages/Players/ClubFind'
import ClubDashboard from '../../pages/Players/ClubDashboard'
import { AuthContextProvider } from '../../../src/context/Player/AuthContext'
import { PlayersContextProvider } from '../../context/Player/PlayersContext'
import { useAuthContext } from '../../hooks/Player/useAuthContext'
import Home from '../../pages/Players/Home'
import PlayerDashboard from '../../pages/Players/PlayerDashboard'
import { useLocation } from 'react-router-dom'
import CheckoutSuccess from '../../pages/Players/CheckoutSuccess'



function PlayerRoutes() {
  const { player } = useAuthContext()
  return (
    <div>

      <BrowserRouter>
        {/* {player ? <PlayerNavbar /> : ""}  */}
        <div className="pages">
          <Routes>
            <Route
              path="/player/clubs"
              element={player ? <ClubFind /> : <Navigate to="/player/login" />}
            />
            <Route
              path="/player/dashboard"
              element={player ? <PlayerDashboard /> : <Navigate to="/player/login" />}
            />
            <Route
              path="/player/club"
              element={player ? <ClubDashboard /> : <Navigate to="/player/login" />}
            /><Route
              path="/player/checkout-success"
              element={<CheckoutSuccess />}
            />
            <Route
              path="/player/home"
              element={player ? <Home /> : <Navigate to="/player/login" />}
            />
            <Route
              path="/"
              element={player ? <Home /> : <Navigate to="/player/login" />}
            />
            <Route
              path="/player/signup"
              element={!player ? <PlayerSignup /> : <Navigate to="/player/home" />}
            />
            <Route
              path="/player/login"
              element={!player ? <PlayerLogin /> : <Navigate to="/player/home" />}
            />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  )
}

export default PlayerRoutes







//   < Route
// path = "/user/signup"
// element = {!player ? <PlayerSignup /> : <Navigate to='/user/home' />}
// />
import React from 'react'
import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom'

//////////pages and components
import PlayerNavbar from '../../components/Players/PlayerNavbar'
import PlayerLogin from '../../pages/Players/PlayerLogin'
import PlayersHome from '../../pages/Players/PlayersHome'
import PlayerSignup from '../../pages/Players/PlayerSignup'
import PlayersFind from '../../pages/Players/PlayersFind'
import {AuthContextProvider} from '../../../src/context/Player/AuthContext'
import { PlayersContextProvider } from '../../context/Player/PlayersContext'
import { useAuthContext } from '../../hooks/Player/useAuthContext'

function PlayerRoutes() {
  const {player} = useAuthContext()
  return (
    <div>
     
      <BrowserRouter>
       {/* {player ? <PlayerNavbar /> : ""}  */}
        <div className="pages">
          <Routes>
            <Route
              path="/user/home"
              element={player ? <PlayersFind /> : <Navigate to='/user/login'/>}
            />
            <Route
              path="/user/signup"
              element={!player ? <PlayerSignup /> : <Navigate to='/user/home'/>}
            />
            <Route
              path="/user/login"
              element={!player ? <PlayerLogin /> : <Navigate to="/user/home"/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    
    </div>
  )
}

export default PlayerRoutes
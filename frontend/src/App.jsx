
import './App.css'
import './index.css'
import { Fragment } from 'react'
import PlayerRoutes from './routes/Players/PlayerRoutes'
import { AuthContextProvider } from './context/Player/AuthContext'
import { PlayersContextProvider } from './context/Player/PlayersContext'
import ClubRoutes from './routes/Clubs/ClubRoutes'

import { ClubAuthContextProvider } from './context/Club/ClubAuthContext'
import { ClubsContextProvider } from './context/Club/ClubsContext'

function App() {
  return (
    <div>
      <Fragment>
        <AuthContextProvider>
          <PlayersContextProvider>
            <PlayerRoutes />
          </PlayersContextProvider>
        </AuthContextProvider>
      </Fragment>


       <Fragment>
        <ClubAuthContextProvider>
          <ClubsContextProvider>
            <ClubRoutes />
          </ClubsContextProvider>
        </ClubAuthContextProvider>
      </Fragment> 




    </div>
  )
}

export default App




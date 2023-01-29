
import './App.css'
import './index.css'
import { Fragment } from 'react'
import PlayerRoutes from './routes/Players/PlayerRoutes'
import { AuthContextProvider } from './context/Player/AuthContext'
import { PlayersContextProvider } from './context/Player/PlayersContext'
import ClubRoutes from './routes/Clubs/ClubRoutes'

import { ClubAuthContextProvider } from './context/Club/ClubAuthContext'
import { ClubsContextProvider } from './context/Club/ClubsContext'
import AdminRoutes from './routes/Admin/AdminRoutes'
import {Provider} from 'react-redux'
import store from './redux-toolkit/store'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
//...
let persistor = persistStore(store);
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

      <Fragment>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AdminRoutes/>
        </PersistGate>
        </Provider>
      </Fragment>




    </div>
  )
}

export default App




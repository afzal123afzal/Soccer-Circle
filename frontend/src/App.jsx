// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './App.css'
// import './index.css'
// import { Fragment } from 'react'
// import PlayerRoutes from './routes/Players/PlayerRoutes'
// import { AuthContextProvider } from './context/Player/AuthContext'
// import { PlayersContextProvider } from './context/Player/PlayersContext'
// import ClubRoutes from './routes/Clubs/ClubRoutes'

// import { ClubAuthContextProvider } from './context/Club/ClubAuthContext'
// import { ClubsContextProvider } from './context/Club/ClubsContext'
// import AdminRoutes from './routes/Admin/AdminRoutes'
// import {Provider} from 'react-redux'
// import store from './redux-toolkit/store'
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';
// //...
// let persistor = persistStore(store);
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import ErrorPage from './pages/Players/ErrorPage';
// import ErrorRoutes from './routes/ErrorRoutes';


// function App() {
//   return (
//     <div>
//       <>

//       <Provider store={store}>
//       <PersistGate persistor={persistor}>
//       <Fragment>
//         <AuthContextProvider>
//           <PlayersContextProvider>
//             <PlayerRoutes />
//           </PlayersContextProvider>
//         </AuthContextProvider>
//       </Fragment>


//        <Fragment>
//         <ClubAuthContextProvider>
//           <ClubsContextProvider>
//             <ClubRoutes />
//           </ClubsContextProvider>
//         </ClubAuthContextProvider>
//       </Fragment> 

//       <Fragment>
//       {/* <Provider store={store}>
//       <PersistGate persistor={persistor}> */}
//         <AdminRoutes/>
//         {/* </PersistGate>
//         </Provider> */}
//       </Fragment>
//       <>
//       <ErrorRoutes/>
//       </>
//       </PersistGate>
//         </Provider>

//       </>


//     </div>
//   )
// }

// export default App










import './App.css'
import './index.css'
import PlayerRoutes from './routes/Players/PlayerRoutes'

import ClubRoutes from './routes/Clubs/ClubRoutes'



import AdminRoutes from './routes/Admin/AdminRoutes'
import { Provider } from 'react-redux'
import store from './redux-toolkit/store'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
let persistor = persistStore(store);
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorPage from './pages/Players/ErrorPage';



function App() {
  return (
    <div>
      <>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <Routes>
                <Route path="/player/*" element={<PlayerRoutes />} />
                <Route path="/club/*" element={<ClubRoutes />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </>


    </div>
  )
}

export default App







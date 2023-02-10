import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components

import ClubLogin from '../../pages/Clubs/ClubLogin'
import ClubSignup from '../../pages/Clubs/ClubSignup'
import ClubNavbar from '../../components/Clubs/ClubNavbar';
import ClubDashboard from '../../pages/Clubs/ClubDashboard';
import ClubFindPlayers from '../../pages/Clubs/ClubFindPlayers'
// import { useClubAuthContext } from '../../hooks/Club/useClubAuthContext';
import { useSelector } from 'react-redux';
import Home from '../../pages/Clubs/Home';
import PlayerDashboard from '../../pages/Clubs/PlayerDashboard';
import CheckoutSuccess from '../../pages/Clubs/CheckoutSuccess';
import ClubChat from '../../pages/Clubs/ClubChat';
import Chat from '../../pages/Clubs/Chat';

function ClubRoutes() {
  // const { club } = useClubAuthContext()
  const clubState = useSelector((state)=>state.club)
  const club = clubState.clubDetails
  return (
    <div>
      <BrowserRouter>
        {/* {club ? <ClubNavbar /> : ""} */}
        <div className="pages">
          <Routes>
          {/* <Route
              path="/club/chat"
              element={club ? <ClubChat/> : <Navigate to='/club/login' />}
            /> */}
            <Route
              path="/club/chat"
              element={club ? <Chat/> : <Navigate to='/club/login' />}
            />
          <Route
              path="/club/checkout-success"
              element={club ? <CheckoutSuccess/> : <Navigate to='/club/login' />}
            />
          <Route
              path="/club/dashboard"
              element={club ? <ClubDashboard /> : <Navigate to='/club/login' />}
            />
            <Route
              path="/club/player"
              element={club ? <PlayerDashboard /> : <Navigate to='/club/login' />}
            />
            <Route
              path="/club/players"
              element={club ? <ClubFindPlayers /> : <Navigate to='/club/login' />}
            />
            <Route
              path="/club/home"
              element={club ? <Home /> : <Navigate to='/club/login' />}
            />
            <Route
              path="/club/login"
              element={!club ? <ClubLogin /> : <Navigate to='/club/home' />}
            />
            <Route
              path="/club/signup"
              element={!club ? <ClubSignup /> : <Navigate to="/club/home" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default ClubRoutes;
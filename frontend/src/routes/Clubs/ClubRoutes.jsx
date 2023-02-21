import { Routes, Route, Navigate } from 'react-router-dom'

// pages & components

import ClubLogin from '../../pages/Clubs/ClubLogin'
import ClubSignup from '../../pages/Clubs/ClubSignup'
import ClubDashboard from '../../pages/Clubs/ClubDashboard';
import ClubFindPlayers from '../../pages/Clubs/ClubFindPlayers'
import { useSelector } from 'react-redux';
import Home from '../../pages/Clubs/Home';
import PlayerDashboard from '../../pages/Clubs/PlayerDashboard';
import CheckoutSuccess from '../../pages/Clubs/CheckoutSuccess';
import Chat from '../../pages/Clubs/Chat';
import ErrorPage from '../../pages/Clubs/ErrorPage'
import SignUpVerify from '../../pages/Clubs/SignUpVerify';
import ForgotPassword from '../../pages/Clubs/ForgotPassword';
import OtpLoginClub from '../../pages/Clubs/OtpLoginClub';

function ClubRoutes() {
  const clubState = useSelector((state) => state.club)
  const club = clubState.clubDetails
  return (
    <div>
      <div className="pages">
        <Routes>
          <Route
            path="/chat"
            element={club ? <Chat /> : <Navigate to='/club/login' />}
          />
          <Route
            path="/checkout-success"
            element={club ? <CheckoutSuccess /> : <Navigate to='/club/login' />}
          />
          <Route
            path="/dashboard"
            element={club ? <ClubDashboard /> : <Navigate to='/club/login' />}
          />
          <Route
            path="/player"
            element={club ? <PlayerDashboard /> : <Navigate to='/club/login' />}
          />
          <Route
            path="/players"
            element={club ? <ClubFindPlayers /> : <Navigate to='/club/login' />}
          />
          <Route
            path="/home"
            element={club ? <Home /> : <Navigate to='/club/login' />}
          />
          <Route
            path="/login"
            element={!club ? <ClubLogin /> : <Navigate to='/club/home' />}
          />
          <Route
            path="/otp-login"
            element={!club ? <OtpLoginClub /> : <Navigate to="/club/home" />}
          />
          <Route
            path="/signup"
            element={!club ? <ClubSignup /> : <Navigate to="/club/home" />}
          />
          <Route
            path="/forgot-password"
            element={!club ? <ForgotPassword /> : <Navigate to="/club/home" />}
          />

          <Route
            path="/verify/:token"
            element={!club ? <SignUpVerify /> : <Navigate to="/club/home" />}
          />
          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </div>

    </div>

  );
}

export default ClubRoutes;
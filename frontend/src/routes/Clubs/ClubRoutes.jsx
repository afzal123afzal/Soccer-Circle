import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components

import ClubLogin from '../../pages/Clubs/ClubLogin'
import ClubSignup from '../../pages/Clubs/ClubSignup'
import ClubNavbar from '../../components/Clubs/ClubNavbar';
import ClubFindPlayers from '../../pages/Clubs/ClubFindPlayers'
import { useClubAuthContext } from '../../hooks/Club/useClubAuthContext';

function ClubRoutes() {
  const { club } = useClubAuthContext()
  return (
    <div>
      <BrowserRouter>
        {/* {club ? <ClubNavbar /> : ""} */}
        <div className="pages">
          <Routes>
            <Route
              path="/club/home"
              element={club ? <ClubFindPlayers /> : <Navigate to='/club/login' />}
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
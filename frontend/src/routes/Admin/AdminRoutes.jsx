import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components




import Home from '../../pages/Admin/AdminHome';
import AdminLogin from '../../pages/Admin/AdminLogin';
import Clubs from '../../pages/Admin/Clubs';
import Players from '../../pages/Admin/Players';
import { useSelector } from 'react-redux';
import ErrorPage from '../../pages/Players/ErrorPage';



function AdminRoutes() {
  const admin = useSelector((state)=>
    state.admin.adminDetails
  )
  console.log("adminState",admin);

  return (
    <div>
        {/* {club ? <ClubNavbar /> : ""} */}
        <div className="pages">
          <Routes>
            <Route
              path="/home"
              element={ admin ? <Home /> : <Navigate to="/admin/login" />}
            />
            <Route
              path="/clubs"
              element={admin ?  <Clubs /> : <Navigate to="/admin/login" /> }
            />
            <Route
              path="/players"
              element={ admin ?  <Players /> : <Navigate to="/admin/login" />}
            />
            <Route
              path="/login"
              element={ admin  ? <Navigate to="/admin/home" /> : <AdminLogin/>}
            />
          <Route path="*" element={<ErrorPage />} />

            
          </Routes>
        </div>
    </div>

  );
}

export default AdminRoutes;
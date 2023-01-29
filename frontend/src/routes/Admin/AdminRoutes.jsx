import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components




import Home from '../../pages/Admin/AdminHome';
import AdminLogin from '../../pages/Admin/AdminLogin';
import Clubs from '../../pages/Admin/Clubs';
import Players from '../../pages/Admin/Players';
import { useSelector } from 'react-redux';



function AdminRoutes() {
  const admin = useSelector((state)=>
    state.admin.adminDetails
  )
  console.log("adminState",admin);

  return (
    <div>
      <BrowserRouter>
        {/* {club ? <ClubNavbar /> : ""} */}
        <div className="pages">
          <Routes>
            <Route
              path="/admin/home"
              element={ admin ? <Home /> : <Navigate to="/admin/login" />}
            />
            <Route
              path="/admin/clubs"
              element={admin ?  <Clubs /> : <Navigate to="/admin/login" /> }
            />
            <Route
              path="/admin/players"
              element={ admin ?  <Players /> : <Navigate to="/admin/login" />}
            />
            <Route
              path="/admin/login"
              element={ admin  ? <Navigate to="/admin/home" /> : <AdminLogin/>}
            />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default AdminRoutes;
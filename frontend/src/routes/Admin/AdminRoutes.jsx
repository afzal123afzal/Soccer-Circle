import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components




import Home from '../../pages/Admin/AdminHome';
import AdminLogin from '../../pages/Admin/AdminLogin';
import Clubs from '../../pages/Admin/Clubs';
import Players from '../../pages/Admin/Players';



function AdminRoutes() {

  return (
    <div>
      <BrowserRouter>
        {/* {club ? <ClubNavbar /> : ""} */}
        <div className="pages">
          <Routes>
            <Route
              path="/admin/home"
              element={ <Home /> }
            />
            <Route
              path="/admin/clubs"
              element={ <Clubs /> }
            />
            <Route
              path="/admin/players"
              element={ <Players /> }
            />
            <Route
              path="/admin/login"
              element={ <AdminLogin /> }
            />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default AdminRoutes;
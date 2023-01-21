import { Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/Player/useAuthContext'

const PrivateRoutes = () => {
  const {player} = useAuthContext()

    
    return(
        player ? <Outlet/> : <Navigate to="user/login"/>
    )
}

export default PrivateRoutes
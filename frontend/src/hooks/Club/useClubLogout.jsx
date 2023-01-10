import { useClubAuthContext } from "./useClubAuthContext"

export const useClubLogout = () => {
  const { dispatch } = useClubAuthContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('club')

    // dispatch logout action
    dispatch({ type: 'CLUBLOGOUT' })
  }

  return { logout }
}
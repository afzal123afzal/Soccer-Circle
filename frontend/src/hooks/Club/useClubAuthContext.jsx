import { ClubAuthContext } from "../../context/Club/ClubAuthContext"
import { useContext } from "react"

export const useClubAuthContext = () => {
  const context = useContext(ClubAuthContext)

  if(!context) {
    throw Error('useClubAuthContext must be used inside an ClubAuthContextProvider')
  }

  return context
}
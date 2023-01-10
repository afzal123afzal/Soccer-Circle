import { ClubsContext } from "../../context/Club/ClubsContext"
import { useContext } from "react"

export const useClubsContext = () => {
  const context = useContext(ClubsContext)

  if(!context) {
    throw Error('useClubsContext must be used inside a ClubsContextProvider')
  }

  return context
}
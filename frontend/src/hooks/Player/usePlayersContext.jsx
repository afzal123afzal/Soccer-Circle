import { PlayersContext } from "../../context/Player/PlayersContext"
import { useContext } from "react"

export const usePlayersContext = () => {
  const context = useContext(PlayersContext)

  if (!context) {
    throw Error('usePlayersContext must be used inside a PlayersContextProvider')
  }

  return context
}
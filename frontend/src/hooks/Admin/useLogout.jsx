// import { useAuthContext } from "./useAuthContext"
// import { usePlayersContext } from "./usePlayersContext"
// import use

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: playerDispatch } = usePlayersContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('player')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
        playerDispatch({ type: 'SET_PLAYERS', payload: null })
    }

    return { logout }
}
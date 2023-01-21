import { createContext, useReducer, useEffect } from 'react'

export const ClubAuthContext = createContext()

export const authClubReducer = (state, action) => {
  switch (action.type) {
    case 'CLUBLOGIN':
      return { club: action.payload }
    case 'CLUBLOGOUT':
      return { club: null }
    default:
      return state
  }
}

export const ClubAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authClubReducer, {
    club: null
  })

  useEffect(() => {
    const club = JSON.parse(localStorage.getItem('club'))
    if (club) {
      dispatch({ type: 'CLUBLOGIN', payload: club })
    }
  }, [])

  console.log('ClubAuthContext state:', state)

  return (
    <ClubAuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ClubAuthContext.Provider>
  )

}
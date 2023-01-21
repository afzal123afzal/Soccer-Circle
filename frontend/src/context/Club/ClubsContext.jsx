import { createContext, useReducer } from 'react'

export const ClubsContext = createContext()

export const ClubsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CLUBS':
      return {
        clubs: action.payload
      }
    case 'CREATE_CLUB':
      return {
        clubs: [action.payload, ...state.workouts]
      }
    case 'DELETE_CLUB':
      return {
        clubs: state.clubs.filter(w => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const ClubsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ClubsReducer, {
    clubs: null
  })

  return (
    <ClubsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ClubsContext.Provider>
  )
}
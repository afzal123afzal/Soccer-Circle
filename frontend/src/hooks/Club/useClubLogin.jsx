import { useState } from 'react'
import { useClubAuthContext} from './useClubAuthContext'
import { axiosClubsInstance } from '../../instance/Axios'

export const useClubLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useClubAuthContext()

  const login = async (email,password) => {
    setIsLoading(true)
    setError(null)
    try {
        const result = await axiosClubsInstance.post("/login", {email,password })
        console.log(result);

        if (result.status === 200) {
            console.log("success");
            //save the user to local storage
            localStorage.setItem('club', JSON.stringify(result))

            //update the ClubauthContext
            dispatch({ type: 'CLUBLOGIN', payload: result })
            setIsLoading(false)
        }

    }
    catch (err) {
        console.log(err);
        if (err.response.status === 404) {
            const Error = err.response.data.mssg
            setIsLoading(false)
            setError(Error)
        }

    }
    
     
  }

  return { login, isLoading, error }
}
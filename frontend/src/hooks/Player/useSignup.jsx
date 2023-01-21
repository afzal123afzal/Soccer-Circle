import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import { axiosPlayersInstance } from "../../instance/Axios";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()



    const signup = async (name, email, mobile, password) => {
        // const user = { email, password }
        setIsLoading(true)
        setError(null)

        try {
            const result = await axiosPlayersInstance.post("/signup", { name, email, mobile, password })

            if (result.status === 200) {
                console.log("success");
                //save the user to local storage
                localStorage.setItem('player', JSON.stringify(result))

                //update the authContext
                dispatch({ type: 'LOGIN', payload: result })
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
    return { signup, isLoading, error }
}



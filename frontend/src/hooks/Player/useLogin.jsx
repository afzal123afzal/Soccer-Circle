import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import { axiosPlayersInstance } from "../../instance/Axios";
import { toast } from "react-toastify";
import { loginPlayer, nameNav, paymentCheck } from "../../redux-toolkit/playerLoginReducer";
import { useDispatch } from 'react-redux'


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    // const { dispatch } = useAuthContext()
    const dispatch = useDispatch()



    const login = async (email, password) => {
        // const user = { email, password }
        setIsLoading(true)
        setError(null)

        try {
            const result = await axiosPlayersInstance.post("/login", { email, password })
            console.log("Result", result);

            if (result.status === 200) {
                console.log("success");
                console.log("localstorage", JSON.stringify(result));
                //save the user to local storage
                localStorage.setItem('player', JSON.stringify(result))

                //update the authContext
                // dispatch({ type: 'LOGIN', payload: result })
                dispatch(loginPlayer(result.data))
                dispatch(paymentCheck(result.data))
                dispatch(nameNav(result.data.name))
                setIsLoading(false)
                toast.success(`Welcome ${result.data.name}`)
            }

        }
        catch (err) {
            console.log(err);
            if (err.response.status === 404) {
                const Error = err.response.data.error
                setIsLoading(false)
                setError(Error)
            }

        }

    }
    return { login, isLoading, error }
}



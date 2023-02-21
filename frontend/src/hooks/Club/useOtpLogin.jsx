import { useState } from "react";
import { axiosClubsInstance } from "../../instance/Axios";
import { toast } from "react-toastify";
import { loginClub, paymentCheck, nameNav } from '../../redux-toolkit/clubLoginReducer'
import { useDispatch } from 'react-redux'


export const useOtpLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const dispatch = useDispatch()



    const login = async (email, otp) => {
        console.log(email,otp,"hi otp login from useOtpLogin hook");
        setIsLoading(true)
        setError(null)

        try {
            const result = await axiosClubsInstance.post("/otp-login", { email, otp })
            console.log(result, "useOtpLogin Hook");
            if (result.status === 200) {
                //save the user to local storage
                localStorage.setItem('club', JSON.stringify(result))

                //update the authContext
                dispatch(loginClub(result.data))
                dispatch(paymentCheck(result.data))
                dispatch(nameNav(result.data.name))
                setIsLoading(false)
                toast.success(`Welcome ${result.data.name} !!!!`)
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



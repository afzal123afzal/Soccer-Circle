import { useState } from "react";
import { axiosPlayersInstance } from "../../instance/Axios";
import { useDispatch } from 'react-redux'
import { loginPlayer, nameNav, paymentCheck } from "../../redux-toolkit/playerLoginReducer";
import { toast } from "react-toastify";


export const useSignup = () => {
    const [error, setError] = useState(null)
    const [success,setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const dispatch = useDispatch()




    const signup = async (name, email, mobile, password,confirmPassword) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await axiosPlayersInstance.post("/signup", { name, email, mobile, password ,confirmPassword})

            if (result.status === 200) {
                //save the user to local storage
                localStorage.setItem('player', JSON.stringify(result))

                //update the authContext
                // dispatch(loginPlayer(result.data))
                // dispatch(paymentCheck(result.data))
                // dispatch(nameNav(result.data.name))
                setSuccess(result.data.message)
                toast.success("Verification has been sent to your mail!!!")
                setIsLoading(false)
                return "success"
            }

        }
        catch (err) {
            console.log(err);
            if (err.response.status === 404) {
                const Error = err.response.data.mssg
                setIsLoading(false)
                setError(Error)
                setSuccess(null)
            }

        }

    }
    return { signup, isLoading, error,success }
}



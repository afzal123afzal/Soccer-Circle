import { useState } from "react";
// import { useAuthContext } from './useAuthContext'
import { axiosAdminInstance } from "../../instance/Axios";
import { useDispatch } from "react-redux";
import loginReducer from "../../redux-toolkit/loginReducer";
import { loginAdmin } from "../../redux-toolkit/loginReducer";

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
            const result = await axiosAdminInstance.post("/login", { email, password })
            console.log("Result",result);

            if (result.status === 200) {
                console.log("success");
            //     console.log("localstorage",JSON.stringify(result));
            //     //save the user to local storage
            //     localStorage.setItem('player', JSON.stringify(result))

            //     //update the authContext
            //     dispatch({ type: 'LOGIN', payload: result })
            dispatch(loginAdmin(result.data))
            
                // setIsLoading(false)
            }

        }
        catch (err) {
            console.log(err);
            if (err.response.status === 400) {
                const Error = err.response.data.error
                setIsLoading(false)
                setError(Error)
            }

        }

    }
    return { login, isLoading, error }
}



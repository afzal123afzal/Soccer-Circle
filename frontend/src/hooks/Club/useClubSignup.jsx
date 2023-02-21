import { useState } from 'react'
import { useClubAuthContext} from './useClubAuthContext'
import { axiosClubsInstance } from '../../instance/Axios'
import { useDispatch} from 'react-redux'
import { loginClub,paymentCheck,nameNav} from '../../redux-toolkit/clubLoginReducer'
import { toast } from 'react-toastify'


export const useClubSignup = () => {
  const [error, setError] = useState(null)
  const [success,setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  // const { dispatch } = useClubAuthContext()
  const dispatch = useDispatch()


  const signup = async (name,email,mobile, password,confirmPassword,regNo) => {
    setIsLoading(true)
    setError(null)
    try {
        const result = await axiosClubsInstance.post("/signup", { name, email, mobile, password,confirmPassword,regNo })
        console.log(result);

        if (result.status === 200) {
            console.log("success");
            //save the user to local storage
            localStorage.setItem('club', JSON.stringify(result))

            //update the ClubauthContext
            // dispatch({ type: 'CLUBLOGIN', payload: result })
            // dispatch(loginClub(result.data))
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
        }

    }
    
     
  }

  return { signup, isLoading, error,success }
}
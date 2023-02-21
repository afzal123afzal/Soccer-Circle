import React, { useState } from "react";
import { axiosClubsInstance } from "../../../instance/Axios";
import { toast } from 'react-toastify'
import { useOtpLogin } from '../../../hooks/Club/useOtpLogin'
import { useNavigate } from "react-router-dom";

function OtpLoginForm({ email }) {
    const [otp, setOtp] = useState("");
    //   const [password, setPassword] = useState("");
    //   const [error, setError] = useState("");
    const [successOne, setSuccessOne] = useState(false);
    const { login, error, isLoading } = useOtpLogin()

    //   const navigate = useNavigate()

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await login(email, otp)
        // toast.success(`Welcome ${result.data.name} !!!!`)


    };

    return (
        <div>
            {successOne ? (
                <div className="success">Login Succesfully</div>
            ) : (
                <form className="login-reset-one" onSubmit={handleFormSubmit}>
                    <label>
                        OTP:
                    </label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />

                    {/* <label>
            New Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
                    <button disabled={isLoading} className="button-test-one" type="submit">Login</button>
                    {error && <div className="error">{error}</div>}
                </form>
            )}
        </div>
    );
}

export default OtpLoginForm;

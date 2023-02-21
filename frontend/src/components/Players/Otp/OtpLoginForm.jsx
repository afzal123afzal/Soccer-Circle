import React, { useState } from "react";
import { axiosPlayersInstance } from "../../../instance/Axios";
import { toast } from 'react-toastify'
import { useOtpLogin } from '../../../hooks/Player/useOtpLogin'
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


    };

    return (
        <div>
            {successOne ? (
                <div className="success">The Password has been reset</div>
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
                    <button disabled={isLoading} className="button-test-one" type="submit">Reset Password</button>
                    {error && <div className="error">{error}</div>}
                </form>
            )}
        </div>
    );
}

export default OtpLoginForm;

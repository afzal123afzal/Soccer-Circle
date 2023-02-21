import React, { useState } from "react";
import { axiosClubsInstance } from "../../../instance/Axios";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

function ResetPasswordForm({ email }) {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successOne, setSuccessOne] = useState(false);
  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log();

    try {
      const response = await axiosClubsInstance.post("/verify-otp", {
        email,
        otp,
      });
      console.log(response);
      const token = response.data.token;
      await axiosClubsInstance.post(
        "/reset-password",
        { email, password, otp },
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      console.log("success");
      setSuccessOne(true);
      navigate('/club/login')
      toast.success("The Password has been reset")


    } catch (err) {
      setError(err.response.data.message);
    }
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

          <label>
            New Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button-test-one" type="submit">Reset Password</button>
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </div>
  );
}

export default ResetPasswordForm;

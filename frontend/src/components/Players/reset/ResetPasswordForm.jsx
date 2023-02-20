import React, { useState } from "react";
import { axiosPlayersInstance } from "../../../instance/Axios";

function ResetPasswordForm({ email }) {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosPlayersInstance.post("/verify-otp", {
        email,
        otp,
      });
      const token = response.data.token;
      await axiosPlayersInstance.post(
        "/reset-password",
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      {success ? (
        <p>Your password has been reset.</p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <label>
            OTP:
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p>{error}</p>}
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
}

export default ResetPasswordForm;

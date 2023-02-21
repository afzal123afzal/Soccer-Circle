import React, { useState } from "react";
import { axiosPlayersInstance } from "../../../instance/Axios";
import './OtpGenerator.css'
import OtpLoginForm from "./OtpLoginForm";

function OtpGenerator() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axiosPlayersInstance.post("/otp-login-generator", { email });
      setSuccess(true);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      {success ? (
        <div className="login-reset1">
          {/* <p>An email has been sent with instructions to reset your password.</p> */}
          {success && <div className="success">The otp has been sent to your mail.</div>}
          <OtpLoginForm email={email} />
        </div>
      ) : (

        <form className="login-reset" onSubmit={handleFormSubmit}>
          <h3 className="text-header-otp">OTP LOGIN</h3>
          <label>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="button-test" type="submit">Submit</button>
          {error && <div className="error">{error}</div>}
        </form>

      )}
    </div>
  );
}

export default OtpGenerator
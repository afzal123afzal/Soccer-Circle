import React, { useState } from "react";
import { axiosClubsInstance } from "../../../instance/Axios";
import ResetPasswordForm from "./ResetPasswordForm";
import './ResetForm.css'

function ResetForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axiosClubsInstance.post("/forgot-password", { email });
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
          {success && <div className="success">An email has been sent with instructions to reset your password.</div>}
          <ResetPasswordForm email={email} />
        </div>
      ) : (

        <form className="login-reset" onSubmit={handleFormSubmit}>
          <h3 className="text-header">Forgot Password</h3>
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

export default ResetForm
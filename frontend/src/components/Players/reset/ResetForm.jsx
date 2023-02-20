import React, { useState } from "react";
import { axiosPlayersInstance } from "../../../instance/Axios";
import ResetPasswordForm from "./ResetPasswordForm";

function ResetForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axiosPlayersInstance.post("/forgot-password", { email });
      setSuccess(true);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      {success ? (
        <div>
          <p>An email has been sent with instructions to reset your password.</p>
          <ResetPasswordForm email={email} />
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default ResetForm
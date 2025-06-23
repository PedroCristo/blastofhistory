import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../data/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      toast.error("Please enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
      setTimeout(() => navigate("/login"), 1500); // 1.2 second delay
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div
      className="reset-password-page"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 340,
          width: "100%",
          backgroundColor: "#1c1c1c",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <h2 className="interactive-color mb-4 text-center">Reset Password</h2>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            marginBottom: 8,
            padding: 10,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />

        {error && <p style={{ color: "red", marginBottom: 8 }}>{error}</p>}

        <button
          className="interactive-color btn"
          onClick={handleReset}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 12,
            borderRadius: 4,
            border: "none",
          }}
        >
          Send Reset Email
        </button>

        <button
          onClick={() => navigate("/login")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            color: "#0d6efd",
            cursor: "pointer",
            fontSize: "1em",
            padding: 0,
          }}
        >
          Back to Login <i className="bi bi-arrow-right ms-1"></i>
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;

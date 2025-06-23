import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../data/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const provider = new GoogleAuthProvider();

  const handleEmailLogin = async () => {
    setError("");

    // Basic validations before Firebase calls
    if (!email.trim()) {
      setError("Please enter your email.");
      toast.error("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      toast.error("Please enter your password.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created and logged in!");
      }

      // Delay navigation after success
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
        toast.error("Please enter a valid email address.");
      } else if (err.code === "auth/missing-password") {
        setError("Please enter your password.");
        toast.error("Please enter your password.");
      } else {
        setError(err.message);
        toast.error(err.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError("");

    try {
      await signInWithPopup(auth, provider);
      toast.success("Login successful!");

      // Delay navigation
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div style={{ maxWidth: 320, margin: "auto", padding: 20 }}>
        <h2 className="interactive-color mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />

        {/* Show Forgot Password link only in login mode */}
        {isLogin && (
          <p style={{ textAlign: "right", marginBottom: 8 }}>
            <Link
              to="/reset-password"
              style={{
                color: "#0d6efd",
                textDecoration: "none",
                fontSize: "0.9em",
              }}
            >
              Forgot Password?
            </Link>
          </p>
        )}

        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
          />
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          className="interactive-color"
          onClick={handleEmailLogin}
          style={{ width: "100%", padding: 10 }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p style={{ marginTop: 10 }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setConfirmPassword("");
            }}
            style={{
              background: "none",
              border: "none",
              color: "blue",
              cursor: "pointer",
              padding: 0,
              fontSize: "1em",
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        <hr />

        <button
          className="btn d-flex align-items-center justify-content-center gap-2"
          onClick={handleGoogleLogin}
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        >
          <img
            src="../images/small/logos/google.png"
            alt="Google Logo"
            style={{ width: 32, height: 32, borderRadius: "50%" }}
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;

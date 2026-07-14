import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebaseconfig";
import { useNavigate } from "react-router";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginuser = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("🎉 Login Successful!");

      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      console.log(error);

      if (error.code === "auth/invalid-credential") {
        alert("Invalid Email or Password");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          🔐
        </div>

        <h1>Welcome Back</h1>

        <p>Login to continue managing your todos.</p>

        <form onSubmit={loginuser}>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            Login
          </button>

        </form>

        <div className="login-footer">
          Don't have an account?
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </div>

      </div>
    </div>
  );
};

export default Login;
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../config/firebaseconfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "./Register.css";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        fullname: fullname,
        email: email,
        createdAt: Timestamp.fromDate(new Date()),
      });

      alert("🎉 User Registered Successfully!");

      setFullname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <div className="logo">
          🚀
        </div>

        <h1>Create Account</h1>
        <p>Join us and manage your todos beautifully.</p>

        <form onSubmit={registerUser}>

          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            Create Account
          </button>

        </form>

        <div className="bottom-text">
          Already have an account?
          <span> Login</span>
        </div>

      </div>
    </div>
  );
};

export default Register;
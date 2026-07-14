import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../config/firebaseconfig'
import { useNavigate } from 'react-router'

const Login = () => {

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

      const navigate = useNavigate()

    const loginuser = (event) => {
        event.preventDefault()
        console.log(email , password);


        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate('/')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    alert('error occured')
    
  });


    }
  return (
    <>
         <h1>Login</h1>
        <form onSubmit={loginuser}>
            <input type="email" placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    </>
  )
}

export default Login
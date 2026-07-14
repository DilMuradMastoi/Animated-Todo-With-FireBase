import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, db } from '../config/firebaseconfig'
import { collection, addDoc, Timestamp } from "firebase/firestore"; 

const Register = () => {

    const [fullname , setFullname] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [uid , setUid] = useState('')


    const registerUser = async (event) => {
        event.preventDefault()

        try { 
          const userCredential = await 
    createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
   console.log( 'Auth user' , user);

  const docRef = await addDoc(collection(db, "users"), {
     uid: user.uid , 
     fullname: fullname ,
     email: email ,
     createdAt:  Timestamp.fromDate(new Date())
  });
  console.log("Firestore Document ID: ", docRef.id);
  alert('user registered successfully');
} catch (error) {
  console.error(error);
  alert(error.message);
}
    };
  return (
    <>
         <h1>Register</h1>
        <form onSubmit={registerUser}>
            <input type="text" placeholder='enter your fullname' value={fullname} onChange={(e) => setFullname(e.target.value)} />
            <input type="email" placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">register</button>
        </form>
    </>
  )
}

export default Register
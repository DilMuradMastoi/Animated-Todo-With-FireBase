import { signOut } from 'firebase/auth';
import React from 'react'
import { Link, useNavigate } from 'react-router'
import { auth } from '../config/firebaseconfig';

const Navbar = () => {

  const navigate = useNavigate()


    const logoutUser = () => {
      signOut(auth).then(() => {
        navigate('/login')
}).catch((error) => {

});
    }
  return (
    <div style={{
        display: 'flex' , 
        justifyContent: 'center' , 
        alignItems: 'center' ,
        gap: '20px',
        margin: '10px  0px'
    }}>
    <Link to={'/login'}>Login</Link>
    <Link to={'/register'}>Register</Link>
    <Link onClick={logoutUser}>Logout</Link>
    <Link to={'/'}>Home</Link>
</div>
  )
}

export default Navbar
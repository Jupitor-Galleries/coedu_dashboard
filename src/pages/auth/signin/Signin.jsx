import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa';
import "./Signin.css"
import { NavLink, useNavigate } from 'react-router-dom';
import { login, signinWithGoogle } from '../../../api/auth';



const Signin = () => {
    
    const navigate = useNavigate();
    // const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const signin = async() => {
        const res = await login()
        if(res) {

        }
    }
    
  return (
    <div className='signin-container'>
        <h2>Welcome back </h2>
        <div className="signin-form">
            <p>We are glad to see you again</p>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="signin-btn" onClick={() => signin()}>Signin</button>
            or
            <div className="google-auth">
                Signin with Google
            <FaGoogle onClick={() =>  signinWithGoogle()}/>
            </div>
            <p>Don't have an account? <NavLink to='/register'>Register</NavLink> </p>
            
        </div>
    </div>
  )
}

export default Signin
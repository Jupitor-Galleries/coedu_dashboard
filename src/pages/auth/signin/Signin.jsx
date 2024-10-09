import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa';
import "./Signin.css"
import { NavLink, useNavigate } from 'react-router-dom';
import { login, signinWithGoogle } from '../../../api/auth';
import { getUserClasses } from '../../../api/class';



const Signin = () => {
    
    const navigate = useNavigate();
    // const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const signin = async() => {
       const classId = localStorage.getItem('lastClass');
        try {
            console.log("called")
            const res = await login(email, password)
            if(res.status) {
                localStorage.setItem('jwt', res.data.token)
              
                const cls = await getUserClasses()
                
                if(classId && cls.data.classes.some(c => c._id == classId)) {
                    navigate(`/class/${classId}`)
                } else {
                    navigate('/classes')}
            }
        } catch (error) {
            console.log(error)
            alert('An error occurred during sign-in. Please try again.')
        }
    }
    
  return (
    <div className='signin-container'>
        <h2>Welcome, Log into you account</h2>
        <div className="signin-form">
            <p className='welcome'>It is our great pleasure to have you on board! </p>
            <div className="form-group">
                {/* <label htmlFor="email">Email</label> */}
                <input type="email" placeholder='Enter email' name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                {/* <label htmlFor="password">Password</label> */}
                <input type="password" name="password" placeholder='enter pasword' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="signin-btn" onClick={() => signin()}>Sign in</button>
            {/* or
            <div className="google-auth">
                Signin with Google
            <FaGoogle onClick={() =>  signinWithGoogle()}/>
            </div> */}
            <p>Don't have an account? <NavLink to='/register'>Register</NavLink> </p>
            
        </div>
    </div>
  )
}

export default Signin
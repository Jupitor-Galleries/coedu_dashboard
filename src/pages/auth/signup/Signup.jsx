import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa';
// import "./Signin.css"
import { NavLink, useNavigate } from 'react-router-dom';
import { createUser, signinWithGoogle } from '../../../api/auth';


export const Steps = () => {

    const navigate = useNavigate();
    const [adminName, setAdminName] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState("one");

    const signup = async() => {
        if(password !== confirmPassword) {
            alert("passwords do not match, kindly fill in matching passwords");
            return
        }

      const res = await createUser(schoolName, adminName, email, password)
        if (res.status) {
            localStorage.setItem('jwt', res.data.token)
            navigate('/classes')
        }
    }

    if(step === 'one') {
        return (
            <>
            <p>It is our great pleasure to have you on board!</p>
            <div className="form-group">
                <label htmlFor="schoolname">Organization Name</label>
                <input type="text" name="schoolname" id="schoolname" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="adminname">Admin's Full Name</label>
                <input type="text" name="adminname" id="adminname" value={adminName} onChange={(e) => setAdminName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button className="signin-btn" onClick={() => {if(schoolName && adminName && email !== ""){setStep("two")} else {alert("Kindly fill in all required details")}}} >Continue</button></>
        )
    } else if (step === 'two') {
        return (
            <>
                <p>Secure your account</p>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="adminname">Confirm Password</label>
                <input type="password" name="confirmpassword" id="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button className="signin-btn" onClick={() => signup()} >Register</button>
            </>
        )
    }
}


const Signup = () => {

  return (
    <div className='signin-container'>
        <h2>Welcome, create your school account</h2>
        <div className="signin-form">
            <Steps />
            {/* or
            <div className="google-auth">
                Signin with Google
            <FaGoogle onClick={() =>  signinWithGoogle()}/>
            </div> */}
            <p>Already have an account? <NavLink to='/signin'>Login</NavLink> </p>
            
        </div>
    </div>
  )
}

export default Signup;
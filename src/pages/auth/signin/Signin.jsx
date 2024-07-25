import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../lib/firebase';
import "./Signin.css"

const provider = new GoogleAuthProvider();

const Signin = () => {

    const baseUrl = "https://auxo.azurewebsites.net/"

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createUser = async () => {
        const url = `${baseUrl}/api/auth/register`
        const body = {
         name,
         email,
         password
        };
    
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          console.log('User created successfully:', data);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };
    

    const signin = async() => {
        signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
      }
  return (
    <div className='signin-container'>
        <h2>Welcome, create your school account </h2>
        <div className="signin-form">
            <h3>We are glad to see you again</h3>
            <div className="form-group">
                <label htmlFor="text">Name</label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="signin-btn" onClick={() => createUser()}>Sign up</button>
            or
            <div className="google-auth">
                Signin with Google
            <FaGoogle onClick={() =>  signin()}/>
            </div>
            
        </div>
    </div>
  )
}

export default Signin
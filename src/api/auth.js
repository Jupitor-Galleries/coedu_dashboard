import { baseUrl } from "../utils/api";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {auth} from '../lib/firebase'

const provider = new GoogleAuthProvider();

export const createUser = async (organization, name, email, password) => {
    const url = `${baseUrl}/api/auth/register`
    const body = {
      organization,
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
      return {status: true, data: data}
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  export const login = async (email, password) => {
    const url = `${baseUrl}/api/auth/login`
    const body = {
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
      return {status: true, data: data}
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

 export const signinWithGoogle = async() => {
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


  export const getCurrentUser = async()=>{
    const url = `${baseUrl}/api/auth/user-details`
    try {
        const token = localStorage.getItem('jwt');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        if (!response.ok) {
            console.log("status is false")
            return { status: false, message: "failed to user details", data:{} }
        }

        return { status: true, data: data }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  }
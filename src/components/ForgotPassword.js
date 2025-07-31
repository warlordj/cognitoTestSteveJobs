import React, { useState, useContext } from 'react';

import { CognitoUser } from 'amazon-cognito-identity-js';
import Pool from "../UserPool"

export default () => {

  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool
    })
  }

  const sendCode = event => {
    event.preventDefault();

    getUser().forgotPassword({
      onSuccess: data => {
        console.log("onSuccess", data);
      },
      onFailure: err => {
        console.error("onFailure", err);
      },
      inputVerificationCode: data => {
        console.log("Input code", data);
        setStage(2);
      }
    })

  }

  const resetPassword = event => {
    event.preventDefault();

    if(password !== confirmPassword) {
      console.error("Passwords are not the same");
      return;
    }

    getUser().confirmPassword(verificationCode, password, {
      onSuccess: data => {
        console.log("onSuccess", data);
      },
      onFailure: err => {
        console.error("onFailure", err);
      }
    })
  }

  return (
    <div>
      
      {stage === 1 && (

        <form onSubmit={sendCode}>
          <input value={email} onChange={event => setEmail(event.target.value)} placeholder='email' />
          <button type='submit'>Forgot Password</button>
        </form>

      )}

      {stage === 2 && (
        <form onSubmit={resetPassword}>
          <input value={verificationCode} onChange={event => setVerificationCode(event.target.value)} placeholder='Verification Code' />
          <input value={password} onChange={event => setPassword(event.target.value)} placeholder='Password' />
          <input value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} placeholder='Confirm Password' />
          <button type='submit'>Change Password</button>
        </form>
      )}
    
      

    </div>
  );
};
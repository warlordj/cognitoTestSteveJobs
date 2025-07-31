import React, { useState, useContext } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js'
import Pool from "../UserPool"


export default () => {

  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');


  const onSubmit = event => {
    event.preventDefault();

    // call confirmSignUp
    let cognitoUser = new CognitoUser({ Username: email, Pool});
    cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
      
      if(err) console.error(err);  
      console.log(result);

    });

    // log the user in (not bothering)

  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        
        <input
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder='email'
        />

        <input
          value={verificationCode}
          onChange={event => setVerificationCode(event.target.value)}
          placeholder='verification code'
        />

        <button type='submit'>Confirm Signup</button>

      </form>
    </div>
  );
};
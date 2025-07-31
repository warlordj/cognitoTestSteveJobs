import React, { useState, useEffect, useContext } from 'react';
import { AccountContext } from "./Accounts";
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';

export default () => {

  const [loggedIn, setLoggedIn] = useState(false);

  const { getSession } = useContext(AccountContext);

  useEffect( () => {

    getSession()
    .then(()=>{
      setLoggedIn(true);
    })
    .catch(err => {
      console.error("failed to login!", err);
      setLoggedIn(false);
    })

  }, []);

  return (
    <div>
      {loggedIn && (
        <>
          <h1>Settings</h1>

          <ChangePassword/>
          <ChangeEmail/>
          
        </>
      )
        
      }
    </div>
  );
};
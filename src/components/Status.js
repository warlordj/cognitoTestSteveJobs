import React, { useState, useEffect, useContext } from 'react';
import { AccountContext } from './Accounts';

export default () => {

  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  useEffect( () => {
    getSession()
      .then(session => {
        console.log("session", session);
        setStatus(true);
      })
      .catch(err => {
        console.error("no session", err);
        setStatus(false);
      })
  })

  return (
    <div>
      {status ? (<div>You are logged in. <button onClick={logout}>Logout</button></div>) : 'please login below'}
    </div>
  )
}
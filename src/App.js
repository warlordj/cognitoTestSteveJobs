import React, { useState } from 'react';
import { Account } from './components/Accounts';
import Signup from './components/Signup';
import Login from './components/Login';
import Status from './components/Status';
import Settings from "./components/Settings";
import ForgotPassword from './components/ForgotPassword';
import ConfirmSignup from './components/ConfirmSignup';
import RNG from "./components/RNG";

export default () => {
  return (
    <Account>
      <RNG/>
      <Status/>
      <Signup/>
      <Login/>
      <ConfirmSignup/>
      <ForgotPassword/>
      <Settings/>
    </Account>
  );
};
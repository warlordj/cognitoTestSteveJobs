import React, { createContext } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import Pool from '../UserPool';

const AccountContext = createContext();

const Account = props => {
  const getSession = async() => {
    return new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if(user) {
        user.getSession(async (err, session) => {
          if(err) {
            reject(err);
          } else {

            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if(err) {
                  reject(err);
                } else {
                  const results = {};
                  for(let attribute of attributes) {
                    const { Name, Value} = attribute;
                    results[Name] = Value;
                  }
                  resolve(results);
                }
              });
              
            });

            const token = session.getIdToken().getJwtToken();

            if(!token) {
              return reject("no ID token found in session")
            }

            resolve({
              user,
              headers: {
                Authorization: token
              },
              ...session,
              ...attributes,
            });
          }
        });
      } else {
        reject("No user found");
      }

    });
  };
    

  const authenticate = async (Username, Password) => {

    await new Promise( (resolve, reject) => {

      const user = new CognitoUser({Username, Pool});
      const authDetails = new AuthenticationDetails({Username,Password});

      user.authenticateUser(authDetails, {

        onSuccess: data => {
          console.log('onSuccess:', data);
          resolve(data);
        },

        onFailure: err => {
          console.error("onFailure:", err);
          reject(err);
        },

        newPasswordRequired: data => {
          console.log("newPasswordRequired", data);
          resolve(data);
        },

      });

    });

  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if(user) {
      user.signOut();
    }
  }


  return (

    <AccountContext.Provider value={{authenticate, getSession, logout}}>
      {props.children}
    </AccountContext.Provider>

  );
};

export { Account, AccountContext };
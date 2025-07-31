import { CognitoUserPool } from 'amazon-cognito-identity-js'

// these are deleted, replace with your own

const poolData = {
UserPoolId: '',
ClientId: '',
};

export default new CognitoUserPool(poolData);
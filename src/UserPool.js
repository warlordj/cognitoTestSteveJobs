import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
UserPoolId: 'us-east-1_YwrWYiU85',
ClientId: '42uqh1he4c0su5jehsvmcukv87',
};

export default new CognitoUserPool(poolData);
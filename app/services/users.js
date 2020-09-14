const aws = require('aws-sdk');
const _ = require('lodash');

const UserPoolId =  "eu-west-1_T2DookXqW" 

exports.listUsers = (callback) => {
	const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider();
  
	cognitoidentityserviceprovider.listUsers({UserPoolId}, callback)
}


exports.deleteUser = (Username,callback) => {
	const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider();

	cognitoidentityserviceprovider.adminDeleteUser({UserPoolId,Username},callback)

}



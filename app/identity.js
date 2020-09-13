const _ = require('lodash');
const {getResponse} = require('./common/utils')
const {decodeToken} = require('./common/authenticator')



exports.index = (event,context,callback) => {

	console.log('Identity')
	
	const {requestContext,headers,body,httpMethod,resource,pathParameters} = event	
	
	const identity = decodeToken(event.headers.Authorization)
	const roles = identity["cognito:groups"] ? identity["cognito:groups"] : ''


	console.log(pathParameters)

	const section = pathParameters['section'] ? pathParameters['section'] : ''

	if (!['details','roles'].includes(section)){
		callback(null, getResponse(401))
		return
	}

	switch (section) {
		case 'details':
		  callback(null, getResponse(200,identity))
		  break;

		  case 'roles':
			callback(null, getResponse(200,roles))
			break;
	}

	callback(null, getResponse(401))
		
}



// if (httpMethod.toUpperCase() ==='GET'){

// 	if ('/user/identity' == resource){
// 		callback(null, getResponse(200,identity))
// 		return

// 	}else if ('/user/roles' == resource){
// 		const roles = identity.payload[ "cognito:groups"]
// 		callback(null, getResponse(200,{roles}))
// 		return
// 	}

// }




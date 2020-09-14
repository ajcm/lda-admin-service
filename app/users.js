const _ = require('lodash');
const {getResponse,getCallback,getError} = require('./common/utils')
const {decodeToken} = require('./common/authenticator')
const {listUsers,deleteUser} = require('./services/users')


const SECTIONS = ['cognitoUsers','roles']


exports.index = (event,context,callback) => {
	const {requestContext,headers,body,httpMethod,resource,pathParameters} = event	
	
	const identity = decodeToken(event.headers.Authorization)
	const section = pathParameters['section'] ? pathParameters['section'] : ''

	const callback_ = getCallback(callback)

	

	if (!SECTIONS.includes(section)){
		getError(401,callback)
	}

	switch (section) {
		case 'cognitoUsers':
			listUsers(callback_)
			return;
			
	}

	callback(null, getResponse(400))
		
}



exports.actions = (event,context,callback) => {

	try {

		const callback_ = getCallback(callback)
		const {requestContext,headers,body,httpMethod,resource,pathParameters} = event		
		const {action,username} = JSON.parse(event.body)


		if (_.isEmpty(action) || _.isEmpty(username)){
			console.log('Bad args',event,body,body.action,username)
			getError(400,callback)
			return			
		}


		switch (action) {
			case 'deleteUser':
				deleteUser(username,callback_)
				return;				
		}

		getError(400,callback)

	}catch(err) {
		callback(null, getResponse(400,err));
	}
		
}









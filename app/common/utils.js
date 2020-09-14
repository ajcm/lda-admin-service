
const getCallback = (callback) => {

	return ( (error,response) =>  {

		if (error){
			console.log('error: ', error)
			callback(null, getResponse(502,error))
			return
		}

		callback(null, getResponse(200,response))
	})
}

const getError = (error,callback) => {

	callback(null, getResponse(error))
	return
}

const getResponse = (status,body) => { 

    var response = {}
    
    response ['statusCode'] = status

    if (true){
        response ['headers'] = ({
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        })
    }

    if (body){
        response ['body'] = JSON.stringify(body)
	}


    return response
}

const getToken = (hh) => (hh.Authorization ?  hh.Authorization : hh.authorization)

const isGet = (event) => (event.httpMethod.toUpperCase() ==='GET')
const isPost = (event) => (event.httpMethod.toUpperCase() ==='POST')
const isResource = (event,resource) => (event.resource === resource)

module.exports = {getResponse,getToken,isGet,isPost,isResource,getCallback,getError}

const {getResponse} = require('./common/utils')
var jwt = require('jsonwebtoken'); 

let response;




const decodeToken = (token) => {

    //Fail if the token is not jwt
    var decodedJwt = jwt.decode(token, {complete: false});
    if (!decodedJwt) {
        console.log("Not a valid JWT token");
       
        return;
    }

    return decodedJwt


}

exports.index = async (event, context) => {
    try {


        console.log('event',event)
        console.log('context',context)
        console.log('Auth',event.headers.Authorization)
        console.log('decoded',decodeToken(event.headers.Authorization))
        //console.log(context)
        
        response = getResponse(200,'This is admin.')
       
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};


exports.echo = async (event, context) => {
    try {
        
        response = getResponse(200,event)
       
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

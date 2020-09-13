var jwt = require('jsonwebtoken'); 
var jwkToPem = require('jwk-to-pem');
const _ = require('lodash');
var fs = require('fs');


exports.decodeToken = (token) => {

  //Fail if the token is not jwt
  var decodedJwt = jwt.decode(token, {complete: false});
  if (!decodedJwt) {
      console.log("Not a valid JWT token");
     
      return;
  }

  return decodedJwt


}
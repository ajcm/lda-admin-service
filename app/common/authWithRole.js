var jwt = require('jsonwebtoken'); 
var jwkToPem = require('jwk-to-pem');
const _ = require('lodash');
var fs = require('fs');

const {authenticate} = require('./authenticator')


const iss = 'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_mYdYam566'

const getToken = (hh) => (hh.Authorization ?  hh.Authorization : hh.authorization)


const authWithRole =  ({token,iss,roles},callback,errorCallback) => {

  authenticate({token,iss,roles},(error,identity) => { 
    if (error){
      errorCallback(error)
    }else{
      callback(identity.payload.sub,identity)
  }})

}
'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const app = require('./index')
const server = awsServerlessExpress.createServer(app)
// exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)
exports.handler = (event, context, callback) => {
	
    // The output from a Lambda proxy integration must be 
    // of the following JSON object. The 'headers' property 
    // is for custom response headers in addition to standard 
    // ones. The 'body' property  must be a JSON string. For 
    // base64-encoded payload, you must also set the 'isBase64Encoded'
    // property to 'true'.
    var responseBody = {
    	"success": true
    };
    var response = {
        statusCode: 200,
        headers: {},
        body: JSON.stringify(responseBody)
    };
    callback(null, response);
}


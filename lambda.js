'use strict'

const fs = require('fs')
var read = require('read-file')

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
    var filePath = path.join('./static', 'test1.css');
    var response = {
        statusCode: 200,
        headers: {
        	"Content-Type": "text/css"
        },
        body: read.sync(filePath).toString('base64'),
        isBase64Encoded : true
    };
    callback(null, response);
}


'use strict'

const fs = require('fs')
const path = require('path');

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
    var responseJSON = {
        statusCode: 200,
        headers: {},
        body: JSON.stringify(responseBody)
    };

    var filePath = path.join('./static', 'test1.css');
    responseBody = {
    	"body": fs.readFileSync(filePath)
    };
    var responseCSS = {
        statusCode: 200,
        headers: {
        	"Content-Type": "text/css"
        },
        // body: fs.readFileSync(filePath).toString('base64'),
        body: JSON.stringify(responseBody),
        isBase64Encoded : true
    };
    callback(null, responseCSS);
    // callback(null, responseJSON);
}


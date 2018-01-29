'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const app = require('./index')
const server = awsServerlessExpress.createServer(app)
// exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)
exports.handler = (event, context, callback) => {
	console.log('event:', event);
	console.log('context:', context);
	callback(null, "Hello!");
}
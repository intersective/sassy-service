'use strict'
const express = require('express')
const cors = require('cors')
const config = require('./config');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express()

app.use(cors())
app.use(awsServerlessExpressMiddleware.eventContext())

app.get('/sassy-front-end', (req, res) => {
	var query = req.apiGateway.event.queryStringParameters;
	// default css
	var filePath = `${config.directory.css}/practera.css`;

	if (query) {
		// use css from experience id
		if (query.hasOwnProperty("e")) {
			var experienceId = query.e;
			filePath = `${config.directory.css}/experiences/${experienceId}/practera.css`;
		}

		// use css from program id
		if (query.hasOwnProperty("p")) {
			var programId = query.p;
			filePath = `${config.directory.css}/programs/${programId}/practera.css`;
		}
	}

	res.sendFile(filePath, {}, (err) => {
    if (err) return res.status(404).end();
  });
  
})

// Export your express server so you can import it in the lambda function.
module.exports = app
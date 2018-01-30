'use strict'
const express = require('express')
const cors = require('cors')
const config = require('./config');
const path = require('path');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express()

app.use(cors())
app.use(awsServerlessExpressMiddleware.eventContext())

app.get('/sassy-front-end', (req, res) => {
	var query = req.apiGateway.event.queryStringParameters;
	// default css
	var filePath = path.resolve(
    path.join(config.directory.live, 'default', 'practera.css')
  );

	if (query) {
		// use css from experience id
		if (query.hasOwnProperty("e")) {
			var experienceId = query.e;
			filePath = path.resolve(
		    path.join(config.directory.live, 'experiences', experienceId, 'practera.css')
		  );
		}

		// use css from program id
		if (query.hasOwnProperty("p")) {
			var programId = query.p;
			filePath = path.resolve(
		    path.join(config.directory.live, 'programs', programId, 'practera.css')
		  );
		}
	}

	res.sendFile(filePath, {}, (err) => {
    if (err) return res.status(404).end();
  });
  
})

// Export your express server so you can import it in the lambda function.
module.exports = app
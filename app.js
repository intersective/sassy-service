'use strict'
const express = require('express')
// const bodyParser = require('body-parser')
// const compression = require('compression')
const cors = require('cors')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express()

app.use(cors())
// app.use(compression())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(awsServerlessExpressMiddleware.eventContext())

app.get('/sassy-front-end', (req, res) => {
	var query = req.apiGateway.event.queryStringParameters;
	// default css
	var filePath = `${__dirname}/static/practera.css`;

	if (query) {
		// use css from experience id
		if (query.hasOwnProperty("e")) {
			var experienceId = query.e;
			filePath = `${__dirname}/static/experiences/${experienceId}/practera.css`;
		}

		// use css from program id
		if (query.hasOwnProperty("p")) {
			var programId = query.p;
			filePath = `${__dirname}/static/programs/${programId}/practera.css`;
		}
	}

	res.sendFile(filePath, {}, (err) => {
    if (err) return res.status(404).end();
  });
  
})

// The aws-serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(3000)

// Export your express server so you can import it in the lambda function.
module.exports = app
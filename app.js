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
	// use css from program id
	// if (req.apiGateway.event.queryStringParameters.hasOwnProperty("p") {
	// 	var programId = req.apiGateway.event.queryStringParameters.p;
	// 	return res.sendFile(`${__dirname}/static/programs/${programId}/practera.css`, {}, (err) => {
	//     if (err) return res.status(404).end();
	//   });
	// }

	// // use css from experience id
	// if (req.apiGateway.event.queryStringParameters.hasOwnProperty("e")) {
	// 	var experienceId = req.apiGateway.event.queryStringParameters.e;
	// 	return res.sendFile(`${__dirname}/static/experiences/${experienceId}/practera.css`, {}, (err) => {
	//     if (err) return res.status(404).end();
	//   });
	// }

	// use default css
	if (!req.apiGateway.event.queryStringParameters) {
		return res.sendFile(`${__dirname}/static/practera.css`)	
	}
  
})

// The aws-serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(3000)

// Export your express server so you can import it in the lambda function.
module.exports = app
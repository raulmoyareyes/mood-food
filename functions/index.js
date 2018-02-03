'use strict';

const sendResponse = require('./utils/send-response');
const functions = require('firebase-functions'); // Cloud Functions for Firebase library
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  if (request.body.result) {
    processV1Request(request, response);
  } else {
    console.log('Invalid Request');
    return response.status(400).end('Invalid Webhook Request (expecting v1 or v2 webhook request)');
  }
});
/*
* Function to handle v1 webhook requests from Dialogflow
*/
function processV1Request (request, response) {
  let action = request.body.result.action; // https://dialogflow.com/docs/actions-and-parameters
  let parameters = request.body.result.parameters; // https://dialogflow.com/docs/actions-and-parameters
  // let inputContexts = request.body.result.contexts; // https://dialogflow.com/docs/contexts

  const actionHandlers = require('./actions');
  // If undefined or unknown action use the default handler
  if (!actionHandlers[action]) {
    action = 'default';
  }
  // Run the proper handler function to handle the request from Dialogflow
  const message = actionHandlers[action](parameters);
  const Http = require('./utils/http')

  Http.getTest().then(test => {
    console.log('request:', test)
    sendResponse(message, response); // Send simple response to user
  })
}

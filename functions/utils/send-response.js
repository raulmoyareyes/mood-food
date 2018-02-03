// Function to send correctly formatted responses to Dialogflow which are then sent to the user
function sendResponse (responseToUser, response) {
  // if the response is a string send it as a response to the user
  if (typeof responseToUser === 'string') {
    let responseJson = {};
    responseJson.speech = responseToUser; // spoken response
    responseJson.displayText = responseToUser; // displayed response
    response.json(responseJson); // Send response to Dialogflow
  } else {
    // If the response to the user includes rich responses or contexts send them to Dialogflow
    let responseJson = {};
    // If speech or displayText is defined, use it to respond (if one isn't defined use the other's value)
    responseJson.speech = responseToUser.speech || responseToUser.displayText;
    responseJson.displayText = responseToUser.displayText || responseToUser.speech;
    // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
    responseJson.data = responseToUser.data;
    // Optional: add contexts (https://dialogflow.com/docs/contexts)
    responseJson.contextOut = responseToUser.outputContexts;
    console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
    response.json(responseJson); // Send response to Dialogflow
  }
}

module.exports = sendResponse;
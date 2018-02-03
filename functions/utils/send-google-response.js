const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
const app = new DialogflowApp({request: request, response: response});
// Function to send correctly formatted Google Assistant responses to Dialogflow which are then sent to the user
function sendGoogleResponse (responseToUser) {
  if (typeof responseToUser === 'string') {
    app.ask(responseToUser); // Google Assistant response
  } else {
    // If speech or displayText is defined use it to respond
    let googleResponse = app.buildRichResponse().addSimpleResponse({
      speech: responseToUser.speech || responseToUser.displayText,
      displayText: responseToUser.displayText || responseToUser.speech
    });
    // Optional: Overwrite previous response with rich response
    if (responseToUser.googleRichResponse) {
      googleResponse = responseToUser.googleRichResponse;
    }
    // Optional: add contexts (https://dialogflow.com/docs/contexts)
    if (responseToUser.googleOutputContexts) {
      app.setContext(...responseToUser.googleOutputContexts);
    }
    console.log('Response to Dialogflow (AoG): ' + JSON.stringify(googleResponse));
    app.ask(googleResponse); // Send response to Dialogflow and Google Assistant
  }
}

module.exports = sendGoogleResponse;
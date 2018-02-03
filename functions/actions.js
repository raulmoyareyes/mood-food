const sendResponse = require('./utils/send-response');

const actions = {
  'input.welcome': (response) => {
      sendResponse('Hello, Welcome to my Dialogflow agent!', response); // Send simple response to user
  },
  'input.unknown': (response) => {
      sendResponse('I\'m having trouble, can you try that again?', response); // Send simple response to user
  },
  'input.greeting': (response) => {
      sendResponse('I\'m Mood Food with cleaned code!', response); // Send simple response to user
  },
  'default': (response) => {
      let responseToUser = {
        speech: 'This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
        text: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
      };
      sendResponse(responseToUser, response);
    }
};

module.exports = actions;
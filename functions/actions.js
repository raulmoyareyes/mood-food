const actions = {
  'input.welcome': (_) => {
      return 'Hello, Welcome to my Dialogflow agent!';
  },
  'input.unknown': (_) => {
      return 'I\'m having trouble, can you try that again?';
  },
  'input.greeting': (_) => {
      return 'I\'m Mood Food with cleaned code!';
  },
  'input.ingredient': (parameters) => {
      return `Ouch! I love ${parameters.ingredient}!`;
  },
  'default': (_) => {
      return {
        speech: 'This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
        text: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
      };
    }
};

module.exports = actions;
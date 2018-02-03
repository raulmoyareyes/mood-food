const Http = require('./utils/http');

const simpleMessage = message => {
  return new Promise(resolve => {
    resolve(message);
  });
};

const actions = {
  'input.welcome': (_) => {
      return simpleMessage('Hello, Welcome to my Dialogflow agent!');
  },
  'input.unknown': (_) => {
      return simpleMessage('I\'m having trouble, can you try that again?');
  },
  'input.greeting': (_) => {
      return simpleMessage('I\'m Mood Food with cleaned code!');
  },
  'input.ingredient': (request) => {
    let parameters = request.body.result.parameters;
    let inputContexts = request.body.result.contexts;

    return Http.search(parameters.ingredient).then(data => {
      console.log('request:', data);
      console.log('context:', inputContexts);
      console.log('parameters:', parameters);

      return `Ouch! I love ${parameters.ingredient}! In fact, I have found ${data.count} recipes. Tell me how many ingredients must the recipe have.`;
    });
  },
  'input.ingredients_count': parameters => {
      return simpleMessage(`To be completed...`);
  },
  'default': (_) => {
      return simpleMessage({
        speech: 'This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
        text: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
      });
    }
};

module.exports = actions;
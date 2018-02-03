const Http = require('./utils/http');
const searchContextByName = require('./utils/search-context');

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
    // let inputContexts = request.body.result.contexts;

    return Http.search(parameters.ingredient).then(data => {
      return `Ouch! I love ${parameters.ingredient}! In fact, I have found ${data.count} recipes. Tell me how many ingredients must the recipe have.`;
    });
  },
  'input.select_diet': (request) => {
    let parameters = request.body.result.parameters;
    let inputContexts = request.body.result.contexts;
    return simpleMessage('This is placeholder for "input.select_diet"')
  },
  'input.ingredients_count': request => {
      let parameters = request.body.result.parameters;
      let inputContexts = request.body.result.contexts;
      const ingredientsCount = parameters.ingredients_count;
      const ingredientContext = searchContextByName(inputContexts, 'ingredient');
      return Http.searchWithIngredientsCount(ingredientContext.parameters.ingredient, ingredientsCount).then(data => {
          const recipe = data && data.hits ? data.hits[0] : 'No recipes found :(...';
          return `I've found your recipe! ${recipe.label}`;
      });
  },
  'default': (_) => {
      return simpleMessage({
        speech: 'This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
        text: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
      });
    }
};

module.exports = actions;
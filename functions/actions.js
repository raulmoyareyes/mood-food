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
  'input.ingredient': (request) => {
    let parameters = request.body.result.parameters;
    // let inputContexts = request.body.result.contexts;

    return Http.search(parameters.ingredient).then(data => {
      return `Oh! I love ${parameters.ingredient}! In fact, I have found ${data.count} recipes. Tell me how many ingredients must the recipe have.`;
    });
  },
  'input.select_diet': (request) => {
    let parameters = request.body.result.parameters;
    let inputContexts = request.body.result.contexts;
    console.log('parameters:', parameters);
    return simpleMessage('I agree with your decision. Which will be the main ingredient of your meal?')
  },
  'input.ingredients_count': request => {
      let parameters = request.body.result.parameters;
      let inputContexts = request.body.result.contexts;
      const ingredientsCount = parameters.ingredients_count;
      const ingredientContext = searchContextByName(inputContexts, 'ingredient');
      return Http.searchWithIngredientsCount(ingredientContext.parameters.ingredient, ingredientsCount).then(data => {
          if(data && data.hits && data.hits[0]) {
            const recipe = data.hits[0].recipe;
            return `I've found your recipe! It is ${recipe.label}. Do you want me to send it to you via email?`;
          }
          return 'Sorry. I have found no recipes with that criteria.';
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
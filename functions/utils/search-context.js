'use strict';

function searchContextByName(context, name) {
  for(let i=0; i < context.length; i++) {
    if (context[i] && context[i].name === name) {
      return context[i];
    }
  }
}

module.exports = searchContextByName;
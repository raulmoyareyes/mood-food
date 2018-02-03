var fetch = require('node-fetch');

const API = 'https://api.edamam.com/'

class Http {

  static _httpCall(url, params) {
    return fetch(API + url, params).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return response
      }
    })
  }

  static search(ingredient, userDiet='balanced') {
    return this._httpCall(`search?q=${ ingredient }&diet=${userDiet}&app_id=79e076d0&app_key=90321d7811d7ae9301373768f758d26a`, { method: 'GET', body: 'a=1' })
  }

  static searchWithIngredientsCount(ingredient, ingredientsCount, userDiet='balanced') {
    return this._httpCall(`search?q=${ ingredient }&diet=${ userDiet }&ingr=${ingredientsCount}&app_id=79e076d0&app_key=90321d7811d7ae9301373768f758d26a`, { method: 'GET', body: 'a=1' })
  }
}

module.exports = Http;
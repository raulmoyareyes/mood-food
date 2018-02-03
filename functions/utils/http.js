var fetch = require('node-fetch');

const API = 'https://api.edamam.com/'

class Http {

  static _httpCall(url, params) {
    return fetch(API + url, params).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return reject(response)
      }
    })
  }

  static search(ingredient, userDiet) {
    let diet = userDiet || 'balanced';

    return this._httpCall(`search?q=${ ingredient }&app_id=79e076d0&app_key=90321d7811d7ae9301373768f758d26a&diet=${diet}`, { method: 'GET', body: 'a=1' })
  }
}

module.exports = Http;
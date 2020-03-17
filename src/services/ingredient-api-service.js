import TokenService from './token-service'
import config from '../config'

const IngredientApiService = {
  getIngredients() {
    return fetch(`${config.API_ENDPOINT}/ingredients`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getIngredient(ingredientId) {
    return fetch(`${config.API_ENDPOINT}/ingredients/${ingredientId}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postIngredient(userId, ingredient) {
    return fetch(`${config.API_ENDPOINT}/ingredients`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        ...ingredient
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default IngredientApiService

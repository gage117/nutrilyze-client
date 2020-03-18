import React from 'react'
import PrivateRoute from '../../Utils/PrivateRoute'
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute'
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import MainPage from '../../routes/MainPage/MainPage'
import LandingRoute from '../../routes/LandingRoute/LandingRoute'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import './App.css'
import LoginPage from '../../routes/LoginPage/LoginPage'
import authService from '../../services/auth-api-service'

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       users: this.sortUsers([]),
       ingredients: this.sortIngredients([]),
       //meals: this.sortIngredients(this.props.Store.meals),
       error: null
    }
  }

  updateIngsFromFetch = (ingredientsArr) => {
    this.setState({
      ingredients: this.sortIngredients(ingredientsArr)
    })
  }

  updateUsersFromFetch = (user) => {
    this.setState({
      users: [user]
    })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  sortUsers = (array) => {
    return array.sort((a, b) => a.id - b.id)
  }

  sortIngredients = (array) => {
    function compare( a, b ) {
      if ( a.name < b.name ){
        return -1;
      }
      if ( a.name > b.name ){
        return 1;
      }
      return 0;
    }
    return array.sort(compare)
  }
  
  updateUserNutrition = (nutritionValues, usersToUpdate) => {
    let updatedUsers = [];
    /** Multiple user functionality, buggy, needs to only compare id not whole user */
    // updatedUsers = updatedUsers.filter(user => {
    //   return !usersToUpdate.includes(user)
    // })
    usersToUpdate.map(user => {
      const updatedUser = {
        id: user.id,
        name: user.name,
        user_name: user.user_name,
        calories: parseInt(user.calories) + parseInt(nutritionValues.calories),
        protein: parseFloat(parseFloat(user.protein) + parseFloat(nutritionValues.protein)).toFixed(2),
        carbs: parseFloat(parseFloat(user.carbs) + parseFloat(nutritionValues.carbs)).toFixed(2),
        sugar: parseFloat(parseFloat(user.sugar) + parseFloat(nutritionValues.sugar)).toFixed(2),
        fiber: parseFloat(parseFloat(user.fiber) + parseFloat(nutritionValues.fiber)).toFixed(2),
        fat: parseFloat(parseFloat(user.fat) + parseFloat(nutritionValues.fat)).toFixed(2),
        sodium: parseInt(user.sodium) + parseInt(nutritionValues.sodium),
      }
      authService.updateUser(updatedUser)
      updatedUsers.push(updatedUser)
      return this.sortUsers(updatedUsers)
    })
    
    this.setState({
      users: updatedUsers
    })
  }

  storeFood = (foodToStore) => {
    /** Checks if ingredient with same name already exists */
    let nameFound;
    const findFood = (food) => {
      if (food.name.toLowerCase() === foodToStore.name.toLowerCase()) {
        nameFound = true;
      }
    }
    this.state.ingredients.some(findFood)

    /** Adds food to store if nameFound isn't true */
    if (nameFound === true) {
      alert('Food with entered name already exists')
    } else {
      this.setState({
        ingredients: this.sortIngredients([...this.state.ingredients, foodToStore])
      })
    }
  }
  render() { 
    const handlers = {
      updateUserNutrition: this.updateUserNutrition,
      updateIngsFromFetch: this.updateIngsFromFetch,
      updateUsersFromFetch: this.updateUsersFromFetch,
      storeFood: this.storeFood,
      setError: this.setError,
      clearError: this.clearError

    }
    return (
      <div id="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path='/'
              component={LandingRoute}
            />
            <PublicOnlyRoute 
              exact
              path='/login'
              component={LoginPage}
            />
            <PublicOnlyRoute
              exact
              path='/register'
              component={RegistrationPage}
            />
            <PrivateRoute
              path='/user/:username'
              component={ 
                MainPage
              }
              props={{
                state: this.state,
                handlers: handlers
              }}
            />
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainPage from '../../routes/MainPage/MainPage'
import LandingRoute from '../../routes/LandingRoute/LandingRoute'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import './App.css'
import LoginPage from '../../routes/LoginPage/LoginPage';

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       users: this.sortUsers(this.props.Store.users),
       ingredients: this.sortIngredients(this.props.Store.ingredients),
       meals: this.sortIngredients(this.props.Store.meals)
    }
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
        calories: parseFloat(user.calories) + parseFloat(nutritionValues.calories),
        protein: parseFloat(user.protein) + parseFloat(nutritionValues.protein),
        carbs: parseFloat(user.carbs) + parseFloat(nutritionValues.carbs),
        sugar: parseFloat(user.sugar) + parseFloat(nutritionValues.sugar),
        fiber: parseFloat(user.fiber) + parseFloat(nutritionValues.fiber),
        fat: parseFloat(user.fat) + parseFloat(nutritionValues.fat),
        sodium: parseFloat(user.sodium) + parseFloat(nutritionValues.sodium),
      }
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
      storeFood: this.storeFood
    }
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path='/'
            component={LandingRoute}
          />
          <Route 
            exact
            path='/login'
            component={LoginPage}
          />
          <Route
            exact
            path='/register'
            component={RegistrationPage}
          />
          <Route
            path='/user/:username'
            render={() => 
              <MainPage state={this.state} handlers={handlers} />
            }
          />
          <Route
            component={NotFoundPage}
          />
        </Switch>
      </div>
    )
  }
}

export default App

import React, {Component} from 'react'
import Header from '../../components/Header/Header'
import ServingForm from '../../components/ServingForm/ServingForm'
import UserNutrition from '../../components/UserNutrition/UserNutrition'
import QuickPick from '../../components/QuickPick/QuickPick'
import ingredientService from '../../services/ingredient-api-service'
import authService from '../../services/auth-api-service'
import './MainPage.css'

export default class MainPage extends Component {

  componentDidMount() {
    this.props.props.handlers.clearError();
    const username  = this.props.computedMatch.params.username
    authService.getUser(username)
      .then(user => {
        this.props.props.handlers.updateUsersFromFetch(user)
      })
    ingredientService.getIngredients()
      .then(this.props.props.handlers.updateIngsFromFetch)
      .catch(this.props.props.handlers.setError)
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <main id='mp__main'>
          <ServingForm users={this.props.props.state.users} handlers={this.props.props.handlers}/>
          <QuickPick state={this.props.props.state} handlers={this.props.props.handlers}/>
          <UserNutrition state={this.props.props.state} handlers={this.props.props.handlers}/>
        </main>
      </React.Fragment>
    )
  }
}
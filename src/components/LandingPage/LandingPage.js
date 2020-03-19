import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './LandingPage.css'
import AuthService from '../../services/auth-api-service'
import TokenService from '../../services/token-service'

class LandingPage extends Component {
  handleDemoClick = () => {
    const demoAccount = {
      "user_name": 'demouser',
      "password": 'password'
    }
    AuthService.postLogin(demoAccount)
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        this.props.onLoginSuccess(demoAccount.user_name)
      })
      .catch(res => {
        console.log({error: res.error})
      })
  }

  render() {
    return (
      <div id='landing-page'>
        <section className='lp__section'>
          <header className='lp__header'>
              <h3>Keep track of nutrition</h3>
          </header>
          <img src={require('../../images/User-Nutrition.png')} alt='User-Nutrition Screenshot'/>
          <p>Nutrilyze stores and tracks nutrition info of all foods you eat. Allowing easy counting, storing, and reading of your current and past intake. You can also add additional users to your profile, allowing simple tracking of multiple people.</p>
        </section>
        <section className='lp__section'>
          <header className='lp__header'>
              <h3>Store foods for easier intake tracking</h3>
          </header>
          <img src={require('../../images/Serving-Form.png')} alt='Serving-Form Screenshot'/>
          <p>Saving the food along with it's nutritional value and serving size allows you to simply retrieve the item again later, keeping you from having to stare at the nutrition facts while you type it in every time.</p>
        </section>
        <section className='lp__section'>
          <header className='lp__header'>
              <h3>Combine ingredients into meals</h3>
          </header>
          <img src={require('../../images/Quick-Pick.png')} alt='Quick-Pick Screenshot'/>
          <p>Storing ingredients and meals separately allows you to easily add up the total nutrients in a combination of ingredients you have around the house. You may have none, some, or all of these ingredients already stored and ready to combine. Any not already stored will be stored for the next meal that uses that ingredient!</p>
        </section>
        <section className='lp__section lp__last-section'>
          <header className='lp__header'>
              <p className='lp__footer'>Get started by</p>
              <Link className='lp__link' to='/register'>Registering</Link>
              <p className='lp__footer'> or by using our </p> 
              <button className='lp__button' onClick={this.handleDemoClick} >Demo Account</button>
          </header>
        </section>
      </div>
    )
  }
}

export default LandingPage

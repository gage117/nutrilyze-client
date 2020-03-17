import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AuthService from '../../services/auth-api-service'
import bcrypt from 'bcryptjs'
import './Register.css'

export default class Register extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, user_name, password } = ev.target
    bcrypt.hash(password.value, 10)
      .then(hashedPassword => {
        const user = {
          name: name.value,
          user_name: user_name.value,
          password: hashedPassword
        }
    
        AuthService.addUser(user)
          .then(() => {
            name.value = ''
            user_name.value = ''
            password.value = ''
            this.props.onRegistrationSuccess()
          })
      })
  }

  componentDidMount() {
    const element = document.getElementById('App');
    element.classList.toggle('Register__App-flex');
  }

  render() {
    const { error } = this.state
    return (
      <section className='Register__container'>
        <h2>Register</h2>
        <form
          className='Register__form'
          onSubmit={this.handleSubmit}
        >
          <div role='alert'>
            {error && <p className='Register__error'>{error}</p>}
          </div>
          <div className='Register__user_name-div'>
            <label htmlFor='Register__user_name'>
              User name 
            </label>
            <input
              name='user_name'
              type='text'
              required
              id='Register__user_name'>
            </input>
          </div>
          <div className='Register__password-div'>
            <label htmlFor='Register__password'>
              Password 
            </label>
            <input
              name='password'
              type='password'
              required
              id='Register__password'>
            </input>
          </div>
          <div className='Register__name-div'>
            <label htmlFor='Register__name'>
              Name
            </label>
            <input
              name='name'
              type='text'
              required
              id='Register__name'>
            </input>
          </div>
          <div className='Register__submit-button-div'>
            <button className='Register__submit-button' type='submit'>
              Register
            </button>
            <p className='Register__or'>or</p>
            <Link className='Register__login-link' to='/login'>login</Link>
          </div>
        </form>
      </section>
    )
  }

  componentWillUnmount() {
    const element = document.getElementById('App');
    element.classList.toggle('Register__App-flex');
  }
}

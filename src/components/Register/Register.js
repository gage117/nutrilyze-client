import React, { Component } from 'react'

export default class Register extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, user_name, password } = ev.target

    console.log('registration form submitted')
    console.log({ name, user_name, password })

    name.value = ''
    user_name.value = ''
    password.value = ''
    this.props.onRegistrationSuccess()
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='Register'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
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
        <div className='password'>
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
        <div className='name'>
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
        <button type='submit'>
          Register
        </button>
      </form>
    )
  }
}

import React, { Component } from 'react'
import Register from '../../components/Register/Register'

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <section className='RegistrationPage'>
        <h2>Register</h2>
        <Register
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    )
  }
}

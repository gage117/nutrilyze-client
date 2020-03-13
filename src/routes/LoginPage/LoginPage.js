import React, { Component } from 'react'
import Login from '../../components/Login/Login'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className='LoginPage'>
        <h2>Login</h2>
        <Login
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    )
  }
}

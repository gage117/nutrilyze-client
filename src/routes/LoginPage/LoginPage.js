import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import Login from '../../components/Login/Login'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = (user_name) => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || `/user/${user_name}`
    history.push(destination)
  }

  render() {
    return (
      <React.Fragment>
        <Header 
          path={this.props.match.path}
        />
        <Login
          onLoginSuccess={this.handleLoginSuccess}
        />
      </React.Fragment>
    )
  }
}

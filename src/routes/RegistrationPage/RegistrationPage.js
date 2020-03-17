import React, { Component } from 'react'
import Header from '../../components/Header/Header'
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
      <React.Fragment>
        <Header 
          path={this.props.match.path}
        />
        <Register
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </React.Fragment>
    )
  }
}

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Header.css'

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          className='Header__logout-button Header__button'
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    /** Checks if the path is on register or login page.
     * If so: it doesn't render the login and register buttons */
    if (this.props.path === '/register' || this.props.path === '/login') {
      return (
        <div className='Header__not-logged-in'>
        </div>
      )
    } else {
      return (
        <div className='Header__not-logged-in'>
          <Link
            className='Header__login-button Header__button'
            to='/login'>
            Login
          </Link>
          <Link
            className='Header__register-button Header__button'
            to='/register'>
            Register
          </Link>
        </div>
      )
    }
  }

  render() {
    return <>
      <nav className='Header'>
        <h1 className='Header__h1'>
          <Link className='Header__main-button' to='/'>
            Nutrilyze
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    </>
  }
}
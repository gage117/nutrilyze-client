import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import {BrowserRouter} from 'react-router-dom'
import Register from './Register'

describe('Register', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  it('renders the UI as exptected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
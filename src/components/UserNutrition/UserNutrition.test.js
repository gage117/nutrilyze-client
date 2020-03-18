import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import {BrowserRouter} from 'react-router-dom'
import UserNutrition from './UserNutrition'

describe('UserNutrition', () => {
  const state = {
    users: [
      {
        id: 1,
        name: 'Gage',
        calories: 666,
        protein: 20,
        carbs: 40,
        sugar: 20,
        fiber: 10,
        fat: 30,
        sodium: 20
      }
    ]
  }

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <UserNutrition state={state}/>
      </BrowserRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  it('renders the UI as exptected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <UserNutrition state={state}/>
        </BrowserRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
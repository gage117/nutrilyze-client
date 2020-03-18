import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import {BrowserRouter} from 'react-router-dom'
import QuickPick from './QuickPick'

describe('QuickPick', () => {
  const state = {
    ingredients: [
      {
        name: 'Banana',
        calories: 89,
        protein: 1.1,
        carbs: 22.8,
        sugar: 12.2,
        fiber: 2.6,
        fat: 0.3,
        sodium: 0,
        serving_size: '100',
        unitOfMeasure: 'g'
      },
      {
        name: 'Broccoli',
        calories: 31,
        protein: 2.5,
        carbs: 6,
        sugar: 1.5,
        fiber: 2.4,
        fat: 0.4,
        sodium: 0,
        serving_size: '1',
        unitOfMeasure: 'cups'
      },
      {
        name: 'White Rice',
        calories: 68,
        protein: 1.42,
        carbs: 14.84,
        sugar: .03,
        fiber: .2,
        fat: 0.04,
        sodium: 1,
        serving_size: '1/3',
        unitOfMeasure: 'cups'
      },
      {
        name: 'Spaghetti Noodles',
        calories: 200,
        protein: 7,
        carbs: 42,
        sugar: 2,
        fiber: 2,
        fat: 1,
        sodium: 0,
        serving_size: '2',
        unitOfMeasure: 'oz'
      },
      {
        name: 'Classico Pasta Sauce',
        calories: 68,
        protein: 1.42,
        carbs: 14.84,
        sugar: .03,
        fiber: .2,
        fat: 0.04,
        sodium: 1,
        serving_size: '1/3',
        unitOfMeasure: 'cups'
      },
    ]
  }

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <QuickPick state={state}/>
      </BrowserRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  it('renders the UI as exptected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <QuickPick state={state}/>
        </BrowserRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
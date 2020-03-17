import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';

describe('App.js', () => {
  const Store = {
    users: [
      {
        id: 1,
        name: 'Gage',
        calories: 666,
        carbs: 40,
        protein: 20,
        fat: 30,
        sodium: 20
      },
      {
        id: 2,
        name: 'Alanna',
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        sodium: 0
      }
    ],
    storedItems: [
      {
        name: 'Banana',
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        sodium: 0,
        serving_size: 0
      }
    ]
  }
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App Store={Store}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<App Store={Store}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
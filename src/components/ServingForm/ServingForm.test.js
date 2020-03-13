import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ServingForm from './ServingForm'

describe('ServingForm', () => {
  const users = [
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
  ]
  
  it('renders without crashing', () => {
  
    const div = document.createElement('div')
    ReactDOM.render(<ServingForm users={users} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<ServingForm users={users} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
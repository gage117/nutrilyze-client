import React from 'react'
import './OurNutrition.css'

function OurNutrition(props) {

  const users = props.state.users.map((user, index) => {
    return (
      <div className='user-container' key={index}>
        <h3>{user.name}</h3>
        <p>Calories: {user.calories}</p>
        <p>Protein: {user.protein}</p>
        <p>Carbs: {user.carbs}</p>
        <p>Sugar: {user.sugar}</p>
        <p>Fiber: {user.fiber}</p>
        <p>Fat: {user.fat}</p>
        <p>Sodium: {user.sodium}</p>
      </div>
    )
  })
  return users
}

export default OurNutrition

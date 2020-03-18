import React from 'react'
import './UserNutrition.css'

function UserNutrition(props) {


  const users = props.state.users.map((user, index) => {
    return (
      <div className='un__user-container' key={index}>
        <h3 className='un__h3'>{user.name}</h3>
        <h6 className='un__h6'>Calories: {user.calories}</h6>
        <div className='un__split-container'>
          <section className='un__half'>
            <p className='un__p'>Protein: {user.protein}g</p>
            <p className='un__p'>Carbs: {user.carbs}g</p>
            <p className='un__p'>Sugar: {user.sugar}g</p>
          </section>
          <section className='un__half'>
            <p className='un__p'>Fiber: {user.fiber}g</p>
            <p className='un__p'>Fat: {user.fat}g</p>
            <p className='un__p'>Sodium: {user.sodium}mg</p>
          </section>
        </div>
      </div>
    )
  })
  return (
    <div className='user-nutrition'>
      {users}
    </div>
  )
}

export default UserNutrition

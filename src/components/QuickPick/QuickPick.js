import React from 'react'
import ReactDOM from 'react-dom'
import './QuickPick.css'

function QuickPick(props) {
  /** JSX Generators */
  function generateIngredient(ingredient, index) {
    return (
      <div key={index} className='list-div'>
        <div id={ingredient.name} className='qp__ingredient-bar qp__border-bottom'>
          <span>{ingredient.name}</span>
          <button id={`${ingredient.name}-button`} className={`${ingredient.name} qp__add-button`} onClick={handleAddClick}>Add</button>
        </div>
        <div id={`${ingredient.name}-hidden`} className='qp__hidden expand-div qp__border-bottom'></div>
      </div>
    )
  }
  /** Meal functionality */
  // function generateMeal(meal, index) {
  //   return (
  //     <div key={index} className='list-div'>
  //       <span>{meal.name}</span>
  //       <button className={meal.name} onClick={handleAddClick}>Add</button>
  //       <div id={meal.name} className='hidden expand-div'></div>
  //     </div>
  //   )
  // }
  function generateForm(item) {
    /** Multiple users functionality */
    /** Returns the checkbox and label JSX of a user */
    // function generateUserChoices(user) {
    //   return (
    //     <div key={user.id}>
    //       <input type='checkbox' className='user-checkbox' id={`${user.name}-list`} name={user.name} />
    //       <label htmlFor={`${user.name}-list`}>{user.name}</label>
    //     </div>
    //   )
    // }
    function getUnitOfMeasureByName(name) {
      const item = getItemByName(name)
      return item.unit_of_measure
    }
    /** Multiple users, Apply-to Checkboxes JSX, add above serving size div */
    // <div className='apply-to-half'>
    //   <span className='apply-to-span'>Apply To: </span>
    //   {props.state.users.map(user => generateUserChoices(user))}
    // </div>
    return (
      <form onSubmit={handleApplyClick} id={`${item}-apply`} className={`qp__add-form`}>
        <label className='qp__add-food-label'>
          <span className='block'>Serving:</span>
          <input type='text' id={`${item}-serving`} className='qp__serving-input' required />
          <span>{getUnitOfMeasureByName(item)}</span>
        </label>
        <button className='qp__apply-button'>Apply</button>
      </form>
    )
  }

  /** gets entire item object by name */
  function getItemByName(name) {
    let item;
    props.state.ingredients.map(ingredient => {
      if (ingredient.name === name) {
        item = ingredient
      }
      return item
    })
    /** Meals functionality */
    // props.state.meals.map(meal => {
    //   if (meal.name === name) {
    //     item = meal
    //   }
    //   return item
    // })
    return item
  }

  /**  */

  /** Button handlers */
  function handleApplyClick(event) {
    event.preventDefault()
    const item = getItemByName(event.target.getAttribute('id').split('-')[0])
    
    let serving_size = item.serving_size;
    if (isNaN(serving_size)) {
      serving_size = serving_size.split('/')
      serving_size = parseFloat(parseInt(serving_size[0]) / parseInt(serving_size[1])).toFixed(2)
    }
    console.log(serving_size)
    const multiplier = parseFloat(event.target[`${item.name}-serving`].value / Number(serving_size)).toFixed(2)
    
    if (isNaN(multiplier)) {
      alert('Serving size must be a number or a fraction (1/3)')
    } else {
      const nutritionValues = {
        calories: parseFloat(item.calories * multiplier).toFixed(0),
        protein: parseFloat(item.protein * multiplier).toFixed(2),
        carbs: parseFloat(item.carbs * multiplier).toFixed(2),
        sugar: parseFloat(item.sugar * multiplier).toFixed(2),
        fiber: parseFloat(item.fiber * multiplier).toFixed(2),
        fat: parseFloat(item.fat * multiplier).toFixed(2),
        sodium: parseFloat(item.sodium * multiplier).toFixed(2),
      }
      
      const usersToUpdate = [props.state.users[0]];
      /** Multiple users functionality */
      // for (let i = 0; i < props.state.users.length; i++) {
      //   if (event.target[`${props.state.users[i].name}-list`].checked && !usersToUpdate.includes(props.state.users[i])) {
      //     usersToUpdate.push(props.state.users[i])
      //   }
      // }
  
      props.handlers.updateUserNutrition(nutritionValues, usersToUpdate)
    }
  }
  function handleAddClick(event) {
    const item = event.target.getAttribute('id').split('-')[0]
    const element = generateForm(item)
    document.getElementById(`${item}-hidden`).classList.toggle('qp__hidden')
    document.getElementById(item).classList.toggle('qp__border-bottom')
    ReactDOM.render(element, document.getElementById(`${item}-hidden`))
  }
  /** Meal functionality */
  // function handleOrganizeMealClick() {

  // }
  /** Meal JSX, add to render above ingredients section */
  // <section className='qp-section meals'>
  //   <div className='meals-header'>
  //     <h3 className='qp-h3'>Meals</h3>
  //     <button>Organize New Meal +</button>
  //   </div>
  //   <div className='list-div'>
  //     <span>Spaghetti {'(HARD CODED)'}</span>
  //     <div className='meal-ingredients-list'>
  //       <p>> Ingredients {'(HARD CODED)'}</p>
  //       <span>Spaghetti Noodles, Pasta Sauce</span>
  //     </div>
  //   </div>
  //   {props.state.meals.map((meal, index) => generateMeal(meal, index))}
  // </section>

  return (
    <div className='quick-pick'>
      <section className='qp__section qp__ingredients'>
        <h2 className='qp__ingredients-header qp__h2'>Ingredients</h2>
        <div id='qp__ingredients-container'>
          {props.state.ingredients.map((ingredient, index) => generateIngredient(ingredient, index))}
        </div>
      </section>
    </div>
  )
}

export default QuickPick

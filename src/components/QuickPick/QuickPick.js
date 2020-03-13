import React from 'react'
import ReactDOM from 'react-dom'
import './QuickPick.css'

function QuickPick(props) {
  /** JSX Generators */
  function generateIngredient(ingredient, index) {
    return (
      <div key={index} className='list-div'>
        <span>{ingredient.name}</span>
        <button className={ingredient.name} onClick={handleAddClick}>Add</button>
        <div id={ingredient.name} className='hidden expand-div'></div>
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
      return item.unitOfMeasure
    }
    /** Multiple users, Apply-to Checkboxes JSX, add above serving size div */
    // <div className='apply-to-half'>
    //   <span className='apply-to-span'>Apply To: </span>
    //   {props.state.users.map(user => generateUserChoices(user))}
    // </div>
    return (
      <form onSubmit={handleApplyClick} className={item}>
        <div className='serving-size-half'>
          <label>
            <span className='block'>Serving:</span>
            <input type='text' id={`${item}-serving`} className='serving-input' required />
            <span>{getUnitOfMeasureByName(item)}</span>
          </label>
          <button>Apply</button>
        </div>
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
    const item = getItemByName(event.target.getAttribute('class'))
    
    let servingSize = item.servingSize;
    if (isNaN(servingSize)) {
      servingSize = servingSize.split('/')
      servingSize = parseFloat(servingSize[0] / servingSize[1]).toFixed(2)
    }
    const multiplier = parseFloat(event.target[`${item.name}-serving`].value / Number(servingSize)).toFixed(2)
    
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
  function handleAddClick(event) {
    const item = event.target.getAttribute('class')
    const element = generateForm(item)
    document.getElementById(item).classList.toggle('hidden')
    ReactDOM.render(element, document.getElementById(item))
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
  //     <div className='ingredients-list'>
  //       <p>> Ingredients {'(HARD CODED)'}</p>
  //       <span>Spaghetti Noodles, Pasta Sauce</span>
  //     </div>
  //   </div>
  //   {props.state.meals.map((meal, index) => generateMeal(meal, index))}
  // </section>

  return (
    <div className='quick-pick'>
      <section className='qp-section ingredients'>
        <h3 className='ingredients-header qp-h3'>Ingredients</h3>
        {props.state.ingredients.map((ingredient, index) => generateIngredient(ingredient, index))}
      </section>
    </div>
  )
}

export default QuickPick

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './QuickPick.css'

class QuickPick extends Component {
  /** JSX Generators */
  generateIngredient(ingredient, index) {
    return (
      <div key={index} className='list-div'>
        <div id={ingredient.name} className='qp__ingredient-bar qp__border-bottom'>
          <span>{ingredient.name}</span>
          <button id={`${ingredient.name}-button`} className={`${ingredient.name} qp__add-button`} onClick={this.handleAddClick}>Add</button>
        </div>
        <div id={`${ingredient.name}-hidden`} className='qp__hidden expand-div qp__border-bottom'></div>
      </div>
    )
  }
  /** Meal functionality */
  // generateMeal(meal, index) {
  //   return (
  //     <div key={index} className='list-div'>
  //       <span>{meal.name}</span>
  //       <button className={meal.name} onClick={handleAddClick}>Add</button>
  //       <div id={meal.name} className='hidden expand-div'></div>
  //     </div>
  //   )
  // }
  generateForm(item) {
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
      const item = this.getItemByName(name)
      return item.unit_of_measure
    }
    /** Multiple users, Apply-to Checkboxes JSX, add above serving size div */
    // <div className='apply-to-half'>
    //   <span className='apply-to-span'>Apply To: </span>
    //   {this.props.state.users.map(user => generateUserChoices(user))}
    // </div>
    return (
      <form onSubmit={this.handleApplyClick} id={`${item}-apply`} className={`qp__add-form`}>
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
  getItemByName(name) {
    let item;
    this.props.state.ingredients.map(ingredient => {
      if (ingredient.name === name) {
        item = ingredient
      }
      return item
    })
    /** Meals functionality */
    // this.props.state.meals.map(meal => {
    //   if (meal.name === name) {
    //     item = meal
    //   }
    //   return item
    // })
    return item
  }

  /**  */

  /** Button handlers */
  handleApplyClick(event) {
    event.preventDefault()
    const item = this.getItemByName(event.target.getAttribute('id').split('-')[0])
    
    let serving_size = item.serving_size;
    if (isNaN(serving_size)) {
      serving_size = serving_size.split('/')
      serving_size = parseFloat(serving_size[0] / serving_size[1]).toFixed(2)
    }
    const multiplier = parseFloat(event.target[`${item.name}-serving`].value / Number(serving_size)).toFixed(2)

    console.log(multiplier)
    
    const nutritionValues = {
      calories: parseFloat(item.calories * multiplier).toFixed(0),
      protein: parseFloat(item.protein * multiplier).toFixed(2),
      carbs: parseFloat(item.carbs * multiplier).toFixed(2),
      sugar: parseFloat(item.sugar * multiplier).toFixed(2),
      fiber: parseFloat(item.fiber * multiplier).toFixed(2),
      fat: parseFloat(item.fat * multiplier).toFixed(2),
      sodium: parseFloat(item.sodium * multiplier).toFixed(2),
    }
    
    const usersToUpdate = [this.props.state.users[0]];
    /** Multiple users functionality */
    // for (let i = 0; i < this.props.state.users.length; i++) {
    //   if (event.target[`${this.props.state.users[i].name}-list`].checked && !usersToUpdate.includes(this.props.state.users[i])) {
    //     usersToUpdate.push(this.props.state.users[i])
    //   }
    // }

    this.props.handlers.updateUserNutrition(nutritionValues, usersToUpdate)
  }
  handleAddClick(event) {
    const item = event.target.getAttribute('id').split('-')[0]
    const element = this.generateForm(item)
    document.getElementById(`${item}-hidden`).classList.toggle('qp__hidden')
    document.getElementById(item).classList.toggle('qp__border-bottom')
    ReactDOM.render(element, document.getElementById(`${item}-hidden`))
  }
  /** Meal functionality */
  // handleOrganizeMealClick() {

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
  //   {this.props.state.meals.map((meal, index) => generateMeal(meal, index))}
  // </section>

  render() {
    return (
      <div className='quick-pick'>
        <section className='qp__section qp__ingredients'>
          <h2 className='qp__ingredients-header qp__h2'>Ingredients</h2>
          <div id='qp__ingredients-container'>
            {this.props.state.ingredients.map((ingredient, index) => this.generateIngredient(ingredient, index))}
          </div>
        </section>
      </div>
    )
  }
}

export default QuickPick

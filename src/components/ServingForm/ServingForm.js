import React, { Component } from 'react'
import './ServingForm.css'

class ServingForm extends Component {

  /** Multiple users */
  /** Returns the checkbox and label JSX of a user */
  // generateUserChoices = (user) => {
  //   return (
  //     <div key={user.id}>
  //       <input type='checkbox' className='user-checkbox' id={user.name} name={user.name} />
  //       <label htmlFor={user.name}>{user.name}</label>
  //     </div>
  //   )
  // }

  handleSubmitForm = (event) => {
    event.preventDefault();

    /** assigns the nutrition values from the input fields */
    const nutritionValues = {
      calories: event.target['calories'].value,
      protein: event.target['protein'].value,
      carbs: event.target['carbs'].value,
      sugar: event.target['sugar'].value,
      fiber: event.target['fiber'].value,
      fat: event.target['fat'].value,
      sodium: event.target['sodium'].value,
    }
    

    /** Iterates over the users and checks if that user's checkbox is checked
     *  -if so: It adds it to the usersToUpdate array to be passed into the updateUserNutrition function
     */
    const usersToUpdate = [this.props.users[0]];
    /** Uncomment this for loop if you want more than one user */
    // for (let i = 0; i < this.props.users.length; i++) {
    //   if (event.target[this.props.users[i].name].checked) {
    //     usersToUpdate.push(this.props.users[i])
    //   }
    // }
    

    /**
     * Checks if the "Store Item" checkbox is checked
     * If so:
     *  -it makes sure "Serving Size" has a value to store with the food
     *  -it runs the storeFood function passed down by App.js
     *  -it runs the updateUserNutrition function passed down by App.js
     * If not:
     *  -it runs only the updateUserNutrition, and doesn't require a serving size
     */
    switch(event.target['store-item'].checked) {
      case (true):
        if (!event.target['serving-size'].value) {
          alert('Serving Size requires a value if "Store Item" is checked');
        } else {
          const foodToStore = {
            name: event.target['name'].value,
            ...nutritionValues,
            serving_size: event.target['serving-size'].value,
            unit_of_measure: event.target['unit-of-measure'].value
          }
    
          this.props.handlers.storeFood(foodToStore)
          this.props.handlers.updateUserNutrition(nutritionValues, usersToUpdate)
        }
        break;
      default:
        this.props.handlers.updateUserNutrition(nutritionValues, usersToUpdate)
        break
    }
  }

  /** Paste this back in after the serving size label to have Apply-to Checkboxes for multiple users */
  // <label id='apply-to' className='apply-to-label block'>
  //   <span className='apply-to-span'>Apply To: </span>
  //     {/** Maps over users and generates a checkbox for each user */}
  //     {this.props.users.map((user) => {
  //       return this.generateUserChoices(user)
  //     })}
  // </label>

  render() {
    return (
      <form className='serving-form' onSubmit={this.handleSubmitForm} autoComplete='off'>
        <h2 className='sf__h2'>Track Food</h2>
        <div className='sf__p-container'>
          <p className='sf__p'>Add nutrition info of a food item to your current nutrition and/or store the item for later</p>
        </div>
        <div className='sf__input-container'>
          <label htmlFor='name' className='sf__label'>
            <span>Name: </span>
            <div className='sf__autocomplete'>
              <input id='name' className='sf__text-input' name='name' type='text' placeholder='Broccoli' required />
            </div>
          </label>
          <label htmlFor='calories' className='sf__label'>
            <span>Calories: </span>
            <input id='calories' className='sf__input-small' name='calories' type='text' placeholder='340' required />
          </label>
          <label htmlFor='protein' className='sf__label'>
            <span>Protein: </span>
            <input id='protein' type='text' className='sf__input-small' name='protein' placeholder='12g' required />
          </label>
          <label htmlFor='carbs' className='sf__label'>
            <span>Carbs: </span>
            <input id='carbs' type='text' className='sf__input-small' name='carbs' placeholder='17g' required />
          </label>
          <label htmlFor='sugar' className='sf__label'>
            <span>Sugar: </span>
            <input id='sugar' type='text' className='sf__input-small' name='sugar' placeholder='10g' required />
          </label>
          <label htmlFor='fiber' className='sf__label'>
            <span>Fiber: </span>
            <input id='fiber' type='text' className='sf__input-small' name='fiber' placeholder='8g' required />
          </label>
          <label htmlFor='fat' className='sf__label'>
            <span>Fat: </span>
            <input id='fat' type='text' className='sf__input-small' name='fat' placeholder='13g' required />
          </label>
          <label htmlFor='sodium' className='sf__label'>
            <span>Sodium: </span>
            <input id='sodium' type='text' className='sf__input-small' name='sodium' placeholder='10mg' required />
          </label>
          <label htmlFor='serving-size' className='sf__label sf__block sf__serving-size-label'>
            <span className='sf__block'>Serving Size: </span>
            <input id='serving-size' type='text' className='sf__text-input' name='serving-size' placeholder='2' />
            <select id='unit-of-measure'>
              <optgroup label='Weight'>
                <option value='oz'>Ounces{'(oz)'}</option>
                <option value='g'>Grams{'(g)'}</option>
              </optgroup>
              <optgroup label='Volume'>
                <option value='cups'>Cups</option>
                <option value='tspn'>Teaspoon{'(tspn)'}</option>
                <option value='tblspn'>Tablespoon{'(tblspn)'}</option>
              </optgroup>
              <optgroup label='Other'>
                <option value='container'>Container</option>
              </optgroup>
            </select>
            <span className='sf__serving-size-note'>Only required if "Store Item" is checked</span>
          </label>
        </div>
        <div className='sf__submit-button-container'>
          <button className='sf__submit-button' type='submit'>Submit</button>
          <label className='sf__label sf__store-item-label'>
            <span htmlFor='store-item'>Store Item: </span> 
            <input id='store-item' name='store-item' type='checkbox' />
          </label>
        </div>
      </form>
    )
  }
}

export default ServingForm

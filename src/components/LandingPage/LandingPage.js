import React from 'react'
import {Link} from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {
  return (
    <div id='landing-page'>
      <section className='lp-section'>
        <header className='lp-header'>
            <h3>Keep track of daily nutrition</h3>
        </header>
        <p>[<em>placeholder for screenshot of current-nutrition-info interface</em>]</p>
        <p>Nutrilyze stores and tracks nutrition info of all foods you eat. Allowing easy counting, storing, and reading of your current and past intake. You can also add additional users to your profile, allowing simple tracking of multiple people.</p>
      </section>
      <section className='lp-section'>
        <header className='lp-header'>
            <h3>Store foods for easier intake tracking</h3>
        </header>
        <p>[<em>placeholder for screenshot of food-store interface</em>]</p>
        <p>Saving the food along with it's nutritional value and serving size allows you to simply retrieve the item again later, keeping you from having to stare at the nutrition facts while you type it in every time.</p>
      </section>
      <section className='lp-section'>
        <header className='lp-header'>
            <h3>Combine ingredients into meals</h3>
        </header>
        <p>[<em>placeholder for screenshot of meals in UI</em>]</p>
        <p>Storing ingredients and meals separately allows you to easily add up the total nutrients in a combination of ingredients you have around the house. You may have none, some, or all of these ingredients already stored and ready to combine. Any not already stored will be stored for the next meal that uses that ingredient!</p>
      </section>
      <section className='lp-section'>
        <header className='lp-header'>
            <h3>Get started by <Link to='/register'>signing up</Link> or by using our <button>Demo Account</button></h3>
        </header>
      </section>
    </div>
  )
}

export default LandingPage

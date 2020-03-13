import React, {Component} from 'react'
import Header from '../../components/Header/Header'
import ServingForm from '../../components/ServingForm/ServingForm'
import OurNutrition from '../../components/OurNutrition/OurNutrition'
import QuickPick from '../../components/QuickPick/QuickPick'

export default class MainPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <main>
          <div className='nutrition-input'>
            <ServingForm users={this.props.state.users} handlers={this.props.handlers}/>
            <QuickPick state={this.props.state} handlers={this.props.handlers}/>
          </div>
          <div className='our-nutrition'>
              <OurNutrition state={this.props.state} />
          </div>
        </main>
      </React.Fragment>
    )
  }
}
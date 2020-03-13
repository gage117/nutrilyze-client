/** File included for readability, other than that reason this file is just a pipeline to the LandingPage Component */
import React from 'react'
import Header from '../../components/Header/Header'
import LandingPage from '../../components/LandingPage/LandingPage'

function LandingRoute() {
  return (
    <React.Fragment>
      <Header />
      <LandingPage />
    </React.Fragment>
  )
}

export default LandingRoute

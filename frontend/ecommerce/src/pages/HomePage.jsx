import React, { Component, Fragment } from 'react'
import FeaturedProducts from '../components/home/FeaturedProducts'

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <FeaturedProducts />
        
         {/* <h2>This is home page</h2> */}
      </Fragment>
    )
  }
}

export default HomePage

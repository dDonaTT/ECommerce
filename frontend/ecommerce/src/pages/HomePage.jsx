import React, { Component, Fragment } from 'react'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Category from '../components/home/Category'

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <FeaturedProducts />
        <Category/>
         {/* <h2>This is home page</h2> */}
      </Fragment>
    )
  }
}

export default HomePage

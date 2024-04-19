import React, { Component, Fragment } from 'react'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Category from '../components/home/Category'
import Footer from '../components/common/Footer'



class HomePage extends Component {
  componentDidMount(){
    window.scroll(0,0)
}
  render() {
    return (
      <Fragment>
         
        <FeaturedProducts />
        <Category/>
         {/* <h2>This is home page</h2> */}
        <Footer/>
      </Fragment>
    )
  }
}

export default HomePage

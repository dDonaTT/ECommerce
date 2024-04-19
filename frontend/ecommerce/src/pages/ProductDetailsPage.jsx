import React, { Component, Fragment } from 'react'
import ProductDetails from '../components/ProductDetails/ProductDetails'

import Footer from '../components/common/Footer'
import SuggestedProduct from '../components/ProductDetails/SuggestedProduct'

class ProductDetailsPage extends Component {
     componentDidMount(){
          window.scroll(0,0)
     }

     render() {
          return (
               <Fragment> 
             

                        

               <ProductDetails /> 
               <SuggestedProduct/>

               <div className="Desktop">
               <Footer/>
               </div>

             

          </Fragment>
          )
     }
}

export default ProductDetailsPage

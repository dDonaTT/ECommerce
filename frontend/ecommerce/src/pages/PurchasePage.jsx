import React, { Component, Fragment } from 'react'

import Purchase from '../components/others/Purchase'
import Footer from '../components/common/Footer'

class PurchasePage extends Component {
     componentDidMount(){
          window.scroll(0,0)
     }

     render() {
          return (
              <Fragment> 
               

                                 

               <Purchase /> 

               <div className="Desktop">
               <Footer/>
               </div>

               
          </Fragment>
          )
     }
}

export default PurchasePage
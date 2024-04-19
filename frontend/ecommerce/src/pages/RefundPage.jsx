import React, { Component, Fragment } from 'react'
import Refund from '../components/others/Refund'

import Footer from '../components/common/Footer'

class RefundPage extends Component {

     componentDidMount(){
          window.scroll(0,0)
     }

     render() {
          return (
              <Fragment> 
               

                                     

               <Refund /> 

               <div className="Desktop">
               <Footer/>
               </div>

              

          </Fragment>
          )
     }
}

export default RefundPage
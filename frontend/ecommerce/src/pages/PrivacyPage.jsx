import React, { Component, Fragment } from 'react'
import Privacy from '../components/others/Privacy'

import Footer from '../components/common/Footer'

class PrivacyPage extends Component {
     componentDidMount(){
          window.scroll(0,0)
     }
     render() {
          return (
               <Fragment> 
               

              
               <Privacy /> 

               <div className="Desktop">
               <Footer/>
               </div>

              

          </Fragment>
          )
     }
}

export default PrivacyPage
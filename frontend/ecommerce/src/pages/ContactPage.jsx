import React, { Component, Fragment } from 'react'
import Contact from '../components/common/Contact'
import Footer from "../components/common/Footer"


class ContactPage extends Component {
    componentDidMount(){
        window.scroll(0,0)
   }

    render() {
         return (
              <Fragment> 
              

                                  

              <Contact /> 

              <div className="Desktop">
              <Footer/>
              </div>

              

         </Fragment>
         )
    }
}

export default ContactPage
import React, { Component, Fragment } from 'react'
import Footer from "../components/common/Footer"
import UserLogin from '../components/common/UserLogin'
import NavMenuDesktop from '../components/common/NavMenuDesktop'


class UserLoginPage extends Component {

    componentDidMount(){
        window.scroll(0,0)
   }
   
    render() {
         return (
             <Fragment>
                <NavMenuDesktop /> 
              
                 

              <UserLogin/>

              <div className="Desktop">
              <Footer/>
              </div>
             </Fragment>
         )
    }
}

export default UserLoginPage
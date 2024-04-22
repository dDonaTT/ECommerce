import React, { Component, Fragment } from 'react'


import NavMenuDesktop from '../components/common/NavMenuDesktop'

import Register from '../components/common/Register'



export class RegisterPage extends Component {

     componentDidMount(){
          window.scroll(0,0)
     }

     render() {
          return (
               <Fragment> 
               <div className="Desktop">
                <NavMenuDesktop /> 
               </div>

               <div className="Mobile">
              
               </div>                       

               <Register /> 
               
               <div className="Desktop">
              
               </div>

               <div className="Mobile">
            
               </div>
               
          </Fragment>
          )
     } 
}

export default RegisterPage
import React, { Component, Fragment } from 'react'


import NavMenuDesktop from '../components/common/NavMenuDesktop'

import Register from '../components/common/Register'



export class RegisterPage extends Component {

     componentDidMount(){
          window.scroll(0,0)
     }

     render() {

          const setUser = this.props.setUser;
          const user = this.props.user;

          return (
               <Fragment> 
               <div className="Desktop">
                <NavMenuDesktop /> 
               </div>

               <div className="Mobile">
              
               </div>                       

               <Register  setUser={setUser} user ={user}/> 
               
               <div className="Desktop">
              
               </div>

               <div className="Mobile">
            
               </div>
               
          </Fragment>
          )
     } 
}

export default RegisterPage
import React, { Component, Fragment } from 'react'
import Favourite from '../components/Favorite/Favorite'
import NavMenuDesktop from '../components/common/NavMenuDesktop'

class FavouritePage extends Component {
     componentDidMount(){
          window.scroll(0,0)
     }
 
     render() {
          const User = this.props.user;
          return (
              <Fragment> 
               <div className="Desktop">
                <NavMenuDesktop /> 
               </div>

                                  

               <Favourite user={User} /> 
               
               
              
               
          </Fragment>
          )
     }
}

export default FavouritePage
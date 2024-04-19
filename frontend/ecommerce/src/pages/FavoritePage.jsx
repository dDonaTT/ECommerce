import React, { Component, Fragment } from 'react'

import Footer from '../components/common/Footer'
import Favourite from '../components/Favorite/Favorite'

class FavouritePage extends Component {
     componentDidMount(){
          window.scroll(0,0)
     }

     render() {
          return (
              <Fragment> 
               

             
               <Favourite /> 

               <div className="Desktop">
               <Footer/>
               </div>

               
          </Fragment>
          )
     }
}

export default FavouritePage
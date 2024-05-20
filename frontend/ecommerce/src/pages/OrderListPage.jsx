import React, { Component, Fragment } from 'react'
import OrderList from '../components/cart/OrderList'
import Footer from "../components/common/Footer";
import NavMenuDesktop from '../components/common/NavMenuDesktop'


 
export class OrderListPage extends Component {
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
                                   

               
               <OrderList user={User} /> 

               <div className="Desktop">
               <Footer/>
               </div>
             
               
          </Fragment>
          )
     }
}
export default OrderListPage
import React, { Component } from "react";
import Delivery from "../../assets/images/delivery-man.png";
import Investment from "../../assets/images/return-on-investment.png";
import GiftCard from "../../assets/images/gift-card.png";
import CreditCard from "../../assets/images/credit-card.png";

export class Icons extends Component {
  render() {
    return (
        <section className="icons-container poppins-medium">
          <div className="icons">
            <img src={Delivery} alt="///" />
            <div className="info">
              <h3>Free Delivery</h3>
              <span>On all orders</span>
            </div>
          </div>

          <div className="icons">
            <img src={Investment} alt="" />
            <div className="info">
              <h3>10 Days Return</h3>
              <span>Moneyback Guarantee</span>
            </div>
          </div>

          <div className="icons">
            <img src={GiftCard} alt="" />
            <div className="info">
              <h3>Offer & Gifts</h3>
              <span>On all orders</span>
            </div>
          </div>

          <div className="icons">
            <img src={CreditCard} alt="" />
            <div className="info">
              <h3>Secure Payments</h3>
              <span>Protected by PayPal</span>
            </div>
          </div>

        </section>
    );
  }
}


export default Icons;

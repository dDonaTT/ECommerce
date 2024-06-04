import React, { Component, Fragment } from "react";

import HeadPhones from "../../assets/images/Best Headphones.jpg";

export class Discount extends Component {
  render() {
    return (
        <div className="body">
          <div className="wrapper">
            <div className="product-img">
              <img src={HeadPhones} alt="Headphones" />
            </div>
            <div className="product-info">
              <div className="product-text">
                <h1>
                  Grab Upto 50% <br />
                  Off On Selected Headphone
                </h1>
              </div>
              <div className="product-price-btn">
                <p>
                  <span>78</span>$
                </p>
                <button type="button">buy now</button>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Discount

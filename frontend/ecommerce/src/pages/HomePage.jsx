import React, { Component, Fragment } from "react";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Category from "../components/home/Category";
import Collection from "../components/home/Collection";
import NewArrival from "../components/home/NewArrival";
import HomeTop from "../components/home/HomeTop";
import NavMenuDesktop from "../components/common/NavMenuDesktop";

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <NavMenuDesktop />
        <HomeTop />
        <FeaturedProducts />
        <NewArrival />
        <Category />
        <Collection />
      </Fragment>
    );
  }
}

export default HomePage;

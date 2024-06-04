import React, { Component, Fragment } from "react";
import { Navbar, Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";

import { Link as ScrollLink, Element } from "react-scroll";
import axios from "axios";
import AppURL from "../../api/AppURL";

class NavMenuDesktop extends Component {
  logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  constructor(props) {
    super(props);
    this.state = {
      MenuData: [],
      cartCount: 0,
      favoriteCount: 0,
     
    };
    
  }

  componentDidMount() {
    axios
      .get(AppURL.AllCategoryDetails)
      .then((response) => {
        this.setState({ MenuData: response.data });
        console.log({ MenuData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    this.fetchCartCount();
    this.fetchFavoriteCount();
  }

  fetchCartCount = () => {
    const email = localStorage.getItem("user_email");
    console.log(email);
    if (email) {
      axios
        .get(AppURL.CartList(email))
        .then((response) => {
          const uniqueProductCodes = new Set(
            response.data.map((item) => item.product_code)
          );
          console.log(uniqueProductCodes);
          this.setState({ cartCount: uniqueProductCodes.size });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };


  fetchFavoriteCount = () => {
    const email = localStorage.getItem("user_email");
    if (email) {
      axios
        .get(AppURL.FavouriteList(email))
        .then((response) => {
          this.setState({ favoriteCount: response.data.length });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  MenuItemClick = (event, category, subcategory) => {
    event.preventDefault();
    event.stopPropagation();

    if (subcategory) {
      const url = `/productsubcategory/${category}/${subcategory}`;
      window.location.href = url;
    }

    event.target.classList.toggle("active");
    var panel = event.target.nextElementSibling;
    if (panel) {
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }
  };

  render() {
    const { MenuData, cartCount, favoriteCount } = this.state;
    let buttons;

    if (
      localStorage.getItem("token") &&
      localStorage.getItem("role") === "user"
    ) {
      buttons = (
        <div className="d-flex align-items-center">
          <Col className="p-0 mt-1" lg={4} md={4} sm={12} xs={12}>
            <RouterLink to="/favourite" className="btn btn-sm">
              <i className="fa h4 fa-heart"></i>
              <sup>
                <span className="badge text-white bg-danger">
                  {favoriteCount}
                </span>
              </sup>
            </RouterLink>
          </Col>

          <Col className="p-0 mt-1" lg={4} md={4} sm={12} xs={12}>
            <RouterLink to="/notification" className="btn btn-sm">
              <i className="fa h4 fa-bell"></i>
              <sup>
                <span className="badge text-white bg-danger">5</span>
              </sup>
            </RouterLink>
          </Col>

          <RouterLink to="/profile" className="h4 btn btn-sm poppins-medium">
            PROFILE
          </RouterLink>
          <RouterLink
            to="/"
            onClick={this.logout}
            className="h4 btn btn-sm poppins-medium"
          >
            LOGOUT
          </RouterLink>

          <Col className="p-0" lg={5} md={5} sm={12} xs={12}>
            <RouterLink
              to="/cart"
              className="cart-btn btn btn-sm poppins-medium"
            >
              <i className="fa fa-shopping-cart"></i> {cartCount} Items
            </RouterLink>
          </Col>
        </div>
      );
    } else if (localStorage.getItem("role") === "admin") {
      buttons = (
        <div className="d-flex align-items-center">
          <Col className="p-0 mt-1" lg={4} md={4} sm={12} xs={12}>
            <RouterLink to="/favourite" className="btn btn-sm">
              <i className="fa h4 fa-heart"></i>
              <sup>
                <span className="badge text-white bg-danger">
                  {favoriteCount}
                </span>
              </sup>
            </RouterLink>
          </Col>

          <Col className="p-0 mt-1" lg={4} md={4} sm={12} xs={12}>
            <RouterLink to="/notification" className="btn btn-sm">
              <i className="fa h4 fa-bell"></i>
              <sup>
                <span className="badge text-white bg-danger">5</span>
              </sup>
            </RouterLink>
          </Col>

          <Col className="p-0 mt-1" lg={6} md={6} sm={12} xs={12}>
            <RouterLink
              to="http://127.0.0.1:8000/dashboard"
              className="h4 btn btn-sm poppins-medium"
            >
              DASHBOARD
            </RouterLink>
          </Col>

          <Col className="p-0 mt-1" lg={4} md={4} sm={12} xs={12}>
            <RouterLink
              to="/"
              onClick={this.logout}
              className="h4 btn btn-sm poppins-medium"
            >
              LOGOUT
            </RouterLink>
          </Col>

          <Col className="p-0" lg={5} md={5} sm={12} xs={12}>
            <RouterLink
              to="/cart"
              className="cart-btn btn btn-sm poppins-medium"
            >
              <i className="fa fa-shopping-cart"></i> {cartCount} Items
            </RouterLink>
          </Col>
        </div>
      );
    } else {
      buttons = (
        <div className="d-flex align-items-center">
          <Col className="p-0 mt-1" lg={4} md={4} sm={12} xs={12}>
            <RouterLink to="/favourite" className="btn btn-sm">
              <i className="fa h4 fa-heart"></i>
              <sup>
                <span className="badge text-white bg-danger">
                  {favoriteCount}
                </span>
              </sup>
            </RouterLink>
          </Col>

          <Col className="p-0 mt-1" lg={4} md={4} sm={12} xs={12}>
            <RouterLink to="/notification" className="btn btn-sm">
              <i className="fa h4 fa-bell"></i>
              <sup>
                <span className="badge text-white bg-danger">5</span>
              </sup>
            </RouterLink>
          </Col>

          <Col className="p-0 mt-1" lg={4} md={4} sm={12} xs={12}>
            <RouterLink to="/login" className="h4 btn btn-sm poppins-medium">
              LOGIN
            </RouterLink>
          </Col>

          <Col className="p-0 mt-1" lg={4} md={4} sm={12} xs={12}>
            <RouterLink to="/register" className="h4 btn btn-sm poppins-medium">
              REGISTER
            </RouterLink>
          </Col>

          <Col className="p-0" lg={5} md={5} sm={12} xs={12}>
            <RouterLink
              to="/cart"
              className="cart-btn btn btn-sm poppins-medium"
            >
              <i className="fa fa-shopping-cart"></i> {cartCount} Items
            </RouterLink>
          </Col>
        </div>
      );
    }

    return (
      <Fragment>
        <div className="TopSectionDown">
          {/* Secondary Navbar */}
          <Navbar fixed={"top"} className="navbar" bg="light">
            <Container
              id="navbar_bar"
              fluid={"true"}
              className="fixed-top p-3 align-items-center"
            >
              <Row className="align-items-center">
                {/* Logo */}
                <Col lg={3} md={3} sm={12} xs={12} className="p-0">
                  <RouterLink to="/" style={{ textDecoration: "none" }}>
                    <h4
                      className="logo-text poetsen-one-regular"
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        fontFamily: "Poetsen One, sans-serif",
                        fontWeight: "700",
                        fontStyle: "normal",
                        fontSize: "2rem",
                        paddingLeft: "3rem",
                        color: "#017D52",
                      }}
                    >
                      Snap<span style={{ color: "#029C66" }}>Buy</span>
                    </h4>
                  </RouterLink>
                </Col>

                {/* Categories Dropdown */}
                <Col
                  className="p-0 mt-1 d-flex align-items-center"
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <Col
                    className="p-0 mt-1 h4 btn btn-sm"
                    lg={4}
                    md={4}
                    sm={12}
                    xs={12}
                  >
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="light"
                        id="dropdown-basic"
                        className="poppins-medium "
                      >
                        Category
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {/* Dropdown items */}
                        <h5 className="poppins-medium">Popular Categories</h5>
                        {MenuData.map((category, index) => (
                          <Dropdown.Item key={index}>
                            {/* Use button wrapper with the accordion class */}
                            <button
                              className="accordion"
                              onClick={(event) =>
                                this.MenuItemClick(
                                  event,
                                  category.category_name,
                                  null
                                )
                              }
                            >
                              <a
                                href="#"
                                onClick={(event) => event.preventDefault()} 
                              >
                                <img
                                  className="accordionMenuIcon"
                                  src={category.category_image}
                                />
                                &nbsp; {category.category_name}
                              </a>
                            </button>
                            <div className="panel">
                              <ul>
                                {category.subcategory_name &&
                                  category.subcategory_name.map(
                                    (subcategory, idx) => (
                                      <li key={idx}>
                                        
                                        <button
                                          className="accordionItem"
                                          onClick={(event) =>
                                            this.MenuItemClick(
                                              event,
                                              category.category_name,
                                              subcategory.subcategory_name
                                            )
                                          }
                                        >
                                          <a
                                            href="#"
                                            onClick={(event) =>
                                              event.preventDefault()
                                            }
                                          >
                                            {subcategory.subcategory_name}{" "}
                                          </a>
                                        </button>
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>

                  {/* What's New */}
                  <Col className="p-0 mt-1" lg={3} md={3} sm={12} xs={12}>
                    <ScrollLink
                      to="newArrivalSection"
                      className="h4 btn btn-sm poppins-medium"
                      smooth={true}
                      duration={500}
                    >
                      What's New
                    </ScrollLink>
                  </Col>

                  {/* Delivery */}
                  <Col className="p-0 mt-1" lg={3} md={3} sm={12} xs={12}>
                    <ScrollLink
                      to="iconsSection"
                      className="h4 btn btn-sm poppins-medium"
                      smooth={true}
                      duration={500}
                    >
                      Delivery
                    </ScrollLink>
                  </Col>

                  {/* Search Bar */}
                  <Col
                    className="p-0 mt-1"
                    lg={5}
                    md={7}
                    sm={12}
                    xs={12}
                    style={{ width: "15rem" }}
                  >
                    
                    <div className="input-group w-100">
                      <input placeholder="Search Product" type="text" className="form-control poppins-medium" />
                      <Button type="button" className="btn site-btn">
                        <i className="fa fa-search"></i>
                      </Button>
                    </div>
                  </Col>
                  <Col className="p-0 mt-1" lg={5} md={7} sm={12} xs={12}>
                    {buttons}
                  </Col>
                </Col>
                {/* Buttons */}
              </Row>
            </Container>
          </Navbar>
        </div>
      </Fragment>
    );
  }
}

export default NavMenuDesktop;

import React, { Component, Fragment } from "react";
import { Navbar, Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import Logo from "../../assets/images/flash-card.png";
import { Link } from "react-router-dom";
import axios from "axios";
import AppURL from "../../api/AppURL";

class NavMenuDesktop extends Component {
  logout = () => {
    localStorage.clear();
  };

  constructor() {
    super();
    this.state = {
      MenuData: [],
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
  }

  MenuItemClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    event.target.classList.toggle("active");
    var panel = event.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  };

  render() {
    let buttons;
    if (localStorage.getItem("token")) {
      buttons = (
        <div className="d-flex align-items-center">
          <Link to="/favourite" className="btn btn-sm">
            <i className="fa h4 fa-heart"></i>
            <sup>
              <span className="badge text-white bg-danger">3</span>
            </sup>
          </Link>

          <Link to="/notification" className="btn btn-sm">
            <i className="fa h4 fa-bell"></i>
            <sup>
              <span className="badge text-white bg-danger">5</span>
            </sup>
          </Link>

          <Link to="/profile" className="h4 btn btn-sm poppins-medium">
            PROFILE
          </Link>
          <Link to="/" onClick={this.logout} className="h4 btn btn-sm poppins-medium">
            LOGOUT
          </Link>

          <Link to="/cart" className="cart-btn btn btn-sm">
            <i className="fa fa-shopping-cart"></i> 3 Items{" "}
          </Link>
        </div>
      );
    } else {
      buttons = (
        <div className="d-flex align-items-center">
          <Col className="p-0 mt-1" lg={4} md={4} sm={12} xs={12}>
            <Link to="/favourite" className="btn btn-sm">
              <i className="fa h4 fa-heart"></i>
              <sup>
                <span className="badge text-white bg-danger">3</span>
              </sup>
            </Link>
          </Col>

          <Col className="p-0 mt-1" lg={4} md={4} sm={12} xs={12}>
            <Link to="/notification" className="btn btn-sm">
              <i className="fa h4 fa-bell"></i>
              <sup>
                <span className="badge text-white bg-danger">5</span>
              </sup>
            </Link>
          </Col>

          <Col className="p-0 mt-1" lg={4} md={4} sm={12} xs={12}>
            <Link to="/login" className="h4 btn btn-sm poppins-medium">
              LOGIN
            </Link>
          </Col>

          <Col className="p-0 mt-1" lg={4} md={4} sm={12} xs={12}>
            <Link to="/register" className="h4 btn btn-sm poppins-medium">
              REGISTER
            </Link>
          </Col>

          <Col className="p-0" lg={5} md={5} sm={12} xs={12}>
            <Link to="/cart" className="cart-btn btn btn-sm poppins-medium">
              <i className="fa fa-shopping-cart"></i> 3 Items{" "}
            </Link>
          </Col>
        </div>
      );
    }

    const { MenuData } = this.state;

    // const View = catList.map((catList, i) => {
    //   return (
    //     <div key={i.toString()}>
    //       <button onClick={this.MenuItemClick} className="accordion">
    //         <img className="accordionMenuIcon" src={catList.category_image} />
    //         &nbsp; {catList.category_name}
    //       </button>
    //       <div className="panel">
    //         <ul>
    //           {catList.subcategory_name.map((SubList, i) => {
    //             return (
    //               <li>
    //                 <a href="#" className="accordionItem">
    //                   {SubList.subcategory_name}{" "}
    //                 </a>
    //               </li>
    //             );
    //           })}
    //         </ul>
    //       </div>
    //     </div>
    //   );
    // });

    return (
      <Fragment >
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
                  <Link to="/" style={{ textDecoration: "none" }}>
                    {/* <img className="nav-logo" src={Logo} alt="Logo" /> */}
                    <h4
                      className="logo-text poetsen-one-regular"
                      style={{
                        // color: "#F29F38",
                        textDecoration: "none",
                        display: "flex",
                        fontFamily: "Poetsen One, sans-serif",
                        fontWeight: "700",
                        fontStyle: "normal",
                        fontSize:"2rem",
                        paddingLeft:"3rem",
                        color:"#017D52"
                      }}
                    >
                      Snap<span style={{ color: "#029C66" }}>Buy</span>
                    </h4>
                  </Link>
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
                      <Dropdown.Toggle variant="light" id="dropdown-basic" className="poppins-medium ">
                        Category
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {/* Dropdown items */}
                        <h5 className="poppins-medium">Popular Categories</h5>
                        {MenuData.map((category, index) => (
                          <Dropdown.Item key={index}>
                            <button
                              onClick={this.MenuItemClick}
                              className="accordion"
                            >
                              <img
                                className="accordionMenuIcon"
                                src={category.category_image}
                              />
                              &nbsp; {category.category_name}
                            </button>
                            <div className="panel">
                              <ul>
                                {category.subcategory_name &&
                                  category.subcategory_name.map(
                                    (subcategory, idx) => (
                                      <li key={idx}>
                                        <a href="#" className="accordionItem">
                                          {subcategory.subcategory_name}{" "}
                                        </a>
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
                    <Link to="/whats-new" className="h4 btn btn-sm poppins-medium">
                      What's New
                    </Link>
                  </Col>

                  {/* Delivery */}
                  <Col className="p-0 mt-1" lg={3} md={3} sm={12} xs={12}>
                    <Link to="/delivery" className="h4 btn btn-sm poppins-medium">
                      Delivery
                    </Link>
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

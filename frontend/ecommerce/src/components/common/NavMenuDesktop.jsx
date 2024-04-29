import React, { Component, Fragment } from "react";
import { Navbar, Container, Row, Col, Button } from "react-bootstrap";
import Logo from "../../assets/images/flash-card.png";
import { Link } from "react-router-dom";

class NavMenuDesktop extends Component {
  logout = () => {
    localStorage.clear();
  };

  render() {
    let buttons;
    if (localStorage.getItem("token")) {
      buttons = (
        <div>
          <Link to="/favourite" className="btn">
            <i className="fa h4 fa-heart"></i>
            <sup>
              <span className="badge text-white bg-danger">3</span>
            </sup>
          </Link>

          <Link to="/notification" className="btn">
            <i className="fa h4 fa-bell"></i>
            <sup>
              <span className="badge text-white bg-danger">5</span>
            </sup>
          </Link>

          <Link to="/profile" className="h4 btn">
            PROFILE
          </Link>
          <Link to="/" onClick={this.logout} className="h4 btn">
            LOGOUT
          </Link>

          <Link to="/cart" className="cart-btn">
            <i className="fa fa-shopping-cart"></i> 3 Items{" "}
          </Link>
        </div>
      );
    } else {
      buttons = (
        <div>
          <Link to="/favourite" className="btn">
            <i className="fa h4 fa-heart"></i>
            <sup>
              <span className="badge text-white bg-danger">3</span>
            </sup>
          </Link>

          <Link to="/notification" className="btn">
            <i className="fa h4 fa-bell"></i>
            <sup>
              <span className="badge text-white bg-danger">5</span>
            </sup>
          </Link>

          <Link to="/login" className="h4 btn">
            LOGIN
          </Link>
          <Link to="/register" className="h4 btn">
            REGISTER
          </Link>

          <Link to="/cart" className="cart-btn">
            <i className="fa fa-shopping-cart"></i> 3 Items{" "}
          </Link>
        </div>
      );
    }
    return (
      <Fragment>
        <div className="TopSectionDown">
          <Navbar fixed={"top"} className="navbar" bg="light">
            <Container
              fluid={"true"}
              className="fixed-top shadow-sm p-2 mb-0 bg-white"
            >
              <Row>
                <Col lg={4} md={4} sm={12} xs={12}>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <img
                      className="nav-logo"
                      src={Logo}
                      style={{ display: "inline-block", marginRight: "5px" }}
                    />
                    <h4
                      className="logo-text lilita-one-regular"
                      style={{
                        color: "#F29F38",
                        textDecoration: "none",
                        display: "inline",
                        fontWeight: "bold",
                        fontSize: "30px",
                      }}
                    >
                      Snap <span style={{ color: "#E07728" }}>Buy</span>
                    </h4>
                  </Link>
                </Col>

                <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                  <div className="input-group w-100">
                    <input type="text" className="form-control" />
                    <Button type="button" className="btn site-btn">
                      <i className="fa fa-search"> </i>
                    </Button>
                  </div>
                </Col>

                <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                  {buttons}
                </Col>
              </Row>
            </Container>
          </Navbar>
        </div>
      </Fragment>
    );
  }
}
export default NavMenuDesktop;

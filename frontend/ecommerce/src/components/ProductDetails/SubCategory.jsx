import React, { Component, Fragment } from "react";
import { Container, Row, Col, Card, Breadcrumb, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeadPhones from "../../assets/images/Best Headphones.jpg";

class SubCategory extends Component {
  // Function to capitalize the first letter of a string
  capitalizeFirstLetter = (string) => {
     if (!string || typeof string !== 'string') {
       return '';
     }
     return string.charAt(0).toUpperCase() + string.slice(1);
   }
   

  render() {
    const MyList = this.props.ProductData;
    const Category = this.capitalizeFirstLetter(this.props.Category);
    const SubCategory = this.capitalizeFirstLetter(this.props.SubCategory);

    const MyView = MyList.map((ProductList, i) => {
      if (ProductList.special_price === "na") {
        return (
          <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6} key={i}>
            <Link
              className="text-link"
              to={"/productdetails/" + ProductList.id}
            >
              <Card className="image-box card w-100">
                <img
                  className="center w-75"
                  src={ProductList.image}
                  alt={ProductList.title}
                />
                <Card.Body>
                  <p className="product-name-on-card">{ProductList.title}</p>
                  <p className="product-price-on-card">
                    Price : ${ProductList.price}
                  </p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      } else {
        return (
          <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6} key={i}>
            <Link
              className="text-link"
              to={"/productdetails/" + ProductList.id}
            >
              <Card className="image-box card w-100">
                <img
                  className="center w-75"
                  src={ProductList.image}
                  alt={ProductList.title}
                />
                <Card.Body>
                  <p className="product-name-on-card">{ProductList.title}</p>
                  <p className="product-price-on-card">
                    Price :{" "}
                    <strike className="text-secondary">
                      ${ProductList.price}
                    </strike>{" "}
                    ${ProductList.special_price}
                  </p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      }
    });

    return (
      <Fragment>
        <Container className="text-center" fluid={true}>
          <Navbar bg="light" expand="lg" className="mb-4">
            <Breadcrumb className="bg-light m-0">
              <Breadcrumb.Item>
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={"/productcategory/" + this.props.Category}>
                  {Category}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link
                  to={
                    "/productsubcategory/" +
                    this.props.Category +
                    "/" +
                    this.props.SubCategory
                  }
                >
                  {SubCategory}
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Navbar>

          <div className="section-title text-center mb-40 mt-2">
            <h2>
              {Category} / {SubCategory}
            </h2>
          </div>

          <Row>{MyView}</Row>
        </Container>
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
      </Fragment>
    );
  }
}

export default SubCategory;

import React, { Component, Fragment } from "react";
import { Container, Row, Col, Card, Breadcrumb, Navbar, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeadPhones from "../../assets/images/Best Headphones.jpg";

class SubCategory extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      ProductData: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    setTimeout(() => {
      this.setState({
        ProductData: this.props.ProductData,
        isLoading: false
      });
    }, 4000); 
  };


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
    const { isLoading } = this.state;

    const MyView = MyList.map((ProductList, i) => {
      if (ProductList.special_price === "na") {
        return (
          <Col key={i.toString()} className="p-2" xl={2} lg={3} md={4} sm={4} xs={10}>
          <Link to={"/productdetails/" + ProductList.id} style={{ textDecoration: 'none' }}>
            <Card className="product-card">
              <div className="image-container">
                <img className="center product-image" src={ProductList.image} alt={ProductList.title} />
                <button className="favorite-button">❤️</button>
              </div>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h3 className="product-name">{ProductList.title}</h3>
                    <span className="product-price">${ProductList.price}</span>
                  </div>
                  <p className="product-rating">⭐ {ProductList.rating?.rate}</p>
                </div>
                <button className="add-to-cart">Add to Cart</button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        );
      } else {
        return (
          <Col key={i.toString()} className="p-2" xl={2} lg={3} md={4} sm={4} xs={10}>
          <Link to={"/productdetails/" + ProductList.id} style={{ textDecoration: 'none' }}>
            <Card className="product-card">
              <div className="image-container">
                <img className="center product-image" src={ProductList.image} alt={ProductList.title} />
                <button className="favorite-button">❤️</button>
              </div>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h3 className="product-name">{ProductList.title}</h3>
                    <span className="product-price">${ProductList.price}</span>
                  </div>
                  <p className="product-rating">⭐ {ProductList.rating?.rate}</p>
                </div>
                <button className="add-to-cart">Add to Cart</button>
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

          <Row>
          {isLoading ? (
              <Col className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                <Spinner animation="border" variant="primary" />
              </Col>
            ) : (
              MyView
            )}
            </Row>
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

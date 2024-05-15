import React, { Component, Fragment } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import AppURL from "../../api/AppURL";
import axios from 'axios';
import HeadPhones from "../../assets/images/Best Headphones.jpg";

class Category extends Component {

  constructor(){
    super();
    this.state={
      MenuData:[]
    }
  }

  componentDidMount(){
    axios.get(AppURL.AllCategoryDetails).then(response =>{
        this.setState({MenuData:response.data});
        console.log({MenuData:response.data});
    }).catch(error => {
        console.log(error);
    });
  }
  
  render() {
    const catList = this.state.MenuData;

    const View = catList.map((catList,i)=>{
      return <Col  key={i.toString()} className="p-0" xl={2} lg={2} md={2} sm={6} xs={6}>
      <Card className="h-100 w-100 text-center">
        <img
          className="center"
          src={catList.category_image}
        />
        <Card.Body>
          <p className="category-name">
            {catList.category_name}
          </p>
        </Card.Body>
      </Card>
    </Col>
    })

    return (
      <Fragment>
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>Product Categories</h2>
          </div>

          <Row>
          {View}
          </Row>
                  </Container>

          <div className="body">
        <div className="wrapper">
            <div className="product-img">
              <img src={HeadPhones} alt="" />
            </div>
            <div className="product-info">
              <div className="product-text">
                <h1>Grab Upto 50% <br />Off  On Selected Headphone</h1>
                {/* <p>Grab Upto 50% Off On Selected Headphone<br /> of peeled fruits and vegetables as<br /> functional objects. The surfaces<br /> appear to be sliced and pulled aside,<br /> allowing room for growth. </p> */}
              </div>
              <div className="product-price-btn">
                <p><span>78</span>$</p>
                <button type="button">buy now</button>
              </div>
            </div>
          </div>
          </div>
      </Fragment>
    );
  }
}

export default Category;

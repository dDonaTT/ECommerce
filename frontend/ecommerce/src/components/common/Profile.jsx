import React, { Component, Fragment } from "react";
import { Navbar, Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Donatshala from '../../assets/images/donatshala.png';
import DefaultUser from '../../assets/images/user.png';
import { Navigate } from "react-router-dom";

class Profile extends Component {
  render() {
    if (!localStorage.getItem("token")) {
      return <Navigate to="/login" />; 
    }
    let name;
    let email;
    let profileImage;

    if (this.props.user) {
      name = this.props.user.name;
      email = this.props.user.email;

      
      if (email === "donatshala69@gmail.com") {
        profileImage = Donatshala;
      } else {
        profileImage = DefaultUser;
      }
    }

    return (
      <Fragment> 
        <div className="section-title text-center mb-55">
          <h2>User Profile Page</h2>         
        </div>
        <Container>
          <Row>
            <Col lg={4} md={4} sm={12}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={profileImage} className="userprofile" />
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <Link className="text-link" to="/orderlist">
                      <p className="product-name-on-card">Order List</p>
                    </Link>
                  </ListGroupItem>
                  
                </ListGroup>
              </Card>
            </Col>

            <Col lg={8} md={8} sm={12}>
              <ul className="list-group">
                <li className="list-group-item">Name: {name}</li>
                <li className="list-group-item">Email: {email}</li>
              </ul>
            </Col>
          </Row>
        </Container> 
      </Fragment>
    );
  }
}

export default Profile;

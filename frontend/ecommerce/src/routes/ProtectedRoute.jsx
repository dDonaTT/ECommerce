import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

if (userRole !== role) {
    return <Container className="text-center p-5 mt-5">
            <Row>
              <Col>
                <h5>You do not have access!</h5>
                <Button className="custombtn p-2" onClick={() => navigate("/")}>Go to Homepage</Button>
              </Col>
            </Row>
           </Container>;
  }
  return children;
};

export default ProtectedRoute;

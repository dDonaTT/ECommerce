import React, { Component, Fragment } from "react";
import { Container, Row, Col, Card, Button, Modal, Spinner, Form } from "react-bootstrap";
import axios from "axios";

class Notification extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      NotificationData: [],
      isLoading: true,
      Notificationmsg: "",
      Notificationtitle: "",
      Notificationdate: "",
      showModal: false,
      newTitle: "",
      newMessage: "",
      isAdmin: false, 
    };
  }

  componentDidMount() {
    this.fetchNotifications();
    this.checkAdminStatus(); 
  }

  fetchNotifications = () => {
    axios
      .get("http://localhost:3001/getNotification")
      .then((response) => {
        this.setState({
          NotificationData: response.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the notifications!", error);
        this.setState({ isLoading: false });
      });
  };

  checkAdminStatus = () => {
    const isAdmin = localStorage.getItem("role");
    if (isAdmin === "admin") {
      this.setState({ isAdmin: true });
    }
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = (event) => {
    let Nmsg = event.target.getAttribute("data-message");
    let Ntitle = event.target.getAttribute("data-title");
    let Ndate = event.target.getAttribute("data-date");
    this.setState({
      show: true,
      Notificationmsg: Nmsg,
      Notificationtitle: Ntitle,
      Notificationdate: Ndate,
    });
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { newTitle, newMessage } = this.state;
    const newDate = new Date().toLocaleDateString();

    axios
      .post("http://localhost:3001/addNotification", {
        newTitle,
        newMessage,
        newDate,
      })
      .then((response) => {
        this.setState({ showModal: false, newTitle: "", newMessage: "" });
        this.fetchNotifications();
      })
      .catch((error) => {
        console.error("There was an error adding the notification!", error);
      });
  };

  handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/deleteNotification/${id}`)
      .then((response) => {
        console.log("Notification deleted");
        this.fetchNotifications();
      })
      .catch((error) => {
        console.error("There was an error deleting the notification!", error);
      });
  };

  render() {
    const {
      NotificationData,
      isLoading,
      show,
      Notificationtitle,
      Notificationdate,
      Notificationmsg,
      showModal,
      newTitle,
      newMessage,
      isAdmin, 
    } = this.state;

    const MyView = NotificationData.map((notification, i) => (
      <Col key={i} className="p-1" md={6} lg={6} sm={12} xs={12}>
        <Card className="notification-card">
          <Card.Body>
            <h6>{notification.title}</h6>
            
            <p className="py-1 px-0  m-0">
              <i className="fa fa-calendar"></i> Date: {notification.date} 
            </p>
            <Button
              data-title={notification.title}
              data-date={notification.date}
              data-message={notification.message}
              className="btn btn-primary mr-5"
              onClick={this.handleShow}
            >
              Details
            </Button>
            {isAdmin && (
              <Button
                
                className="mr-2 btn btn-danger"
                onClick={() => this.handleDelete(notification.id)}
              >
                Delete
              </Button>
            )}
          </Card.Body>
        </Card>
      </Col>
    ));

    return (
      <Fragment>
        <Container className="TopSection">
          {isAdmin && (
            <Button variant="success" className="mb-3" onClick={this.handleShowModal}>
              Add Notification
            </Button>
          )}
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <Row>{MyView}</Row>
          )}
        </Container>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <h6>
              <i className="fa fa-calendar"></i> Date: {Notificationdate}
            </h6>
          </Modal.Header>
          <Modal.Body>
            <h6>{Notificationtitle}</h6>
            <p>{Notificationmsg}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="newTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="newTitle"
                  value={newTitle}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="newMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="newMessage"
                  value={newMessage}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}

export default Notification;

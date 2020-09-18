import React, { useContext } from "react";
import { UserContext } from "../../App";
import "./booking.css";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Booking = () => {
  // const [placeData, setPlaceData] = useContext(UserContext);
  const { placeDataPass } = useContext(UserContext);
  const [placeData, setPlaceData] = placeDataPass;
  return (
    <section className="home-bg pt-200">
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={4}>
            <h2 className="place-name">{placeData.name}</h2>
            <p className="place-des">{placeData.longDescription}</p>
          </Col>
          <Col md={4}>
            <div className="booking-form">
              <Form>
                <Form.Group>
                  <Form.Label>Origin</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter origin"
                    value="Dhaka"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Destination</Form.Label>
                  <Form.Control type="text" value={placeData.name} />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>From</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>To</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                </Row>
                <Link to={"/hotels/" + placeData.name}>
                  <Button className="start-booking-btn">Start Booking</Button>
                </Link>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Booking;

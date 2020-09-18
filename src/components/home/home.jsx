import React, { useContext, useState } from "react";
import "./home.css";
import { UserContext } from "../../App";
import { Button, Col, Container, Row } from "react-bootstrap";
import place from "../../placedata";
import Place from "../place/place";
import { Link } from "react-router-dom";
const Home = () => {
  // const [placeData, setPlaceData] = useContext(UserContext);
  const { placeDataPass } = useContext(UserContext);
  const [placeData, setPlaceData] = placeDataPass;
  const [showPlace, setshowPlace] = useState(place[0]);
  setPlaceData(showPlace);

  const handleShowPlace = (placedata) => {
    let targetplace = place.find((data) => data === placedata);
    setshowPlace(targetplace);
    setPlaceData(showPlace);
  };
  return (
    <React.Fragment>
      <section className="home-bg pt-200">
        <Container fluid>
          <Row className="justify-content-center">
            <Col md={4}>
              <h2 className="place-name">{showPlace.name}</h2>
              <p className="place-des">{showPlace.shortDescription}</p>
              <Link to={"/booking/" + showPlace.name}>
                <Button className="book-btn">Booking</Button>
              </Link>
            </Col>
            {place.map((data) => (
              <Place
                placeData={data}
                key={data.id}
                handleShowPlace={handleShowPlace}
              />
            ))}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Home;

import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { UserContext } from "../../App";
import hotel from "../../hoteldata";
import "./hotels.css";
const Hotels = () => {
  const { placeDataPass } = useContext(UserContext);
  const [placeData, setPlaceData] = placeDataPass;
  console.log(placeData.map);
  return (
    <section className="pt-100">
      <Container>
        <Row>
          <Col md={7}>
            <small>252 stays Apr 13/17 3 guests</small>
            <h2>Stay's in {placeData.name}</h2>
            {hotel.map((hotel) => (
              <React.Fragment key={hotel.id}>
                <div className="hotel-box d-flex">
                  <img src={hotel.image} alt="HOtel interioir" />
                  <div className="hotel-des">
                    <h2>{hotel.title}</h2>
                    <div className="d-flex justify-content-between">
                      <small>{hotel.guest} Guests</small>
                      <small>{hotel.bedroom} Bedrooms</small>
                      <small>{hotel.bed} Beds</small>
                      <small>{hotel.bath} Baths</small>
                    </div>
                    <p>{hotel.condition}</p>
                    <p>{hotel.terms}</p>
                    <div className="d-flex justify-content-between">
                      <p className="rating">
                        {hotel.rating}({hotel.ratingnumber})
                      </p>
                      <p className="price">${hotel.price}/Night</p>
                      <p>${hotel.totalprice} total</p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </Col>
          <Col md={5}>
            <div className="location-map">
              <iframe
                src={"https://www.google.com/maps/embed?pb=" + placeData.map}
                width="100%"
                height="100%"
                title="Map Google"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hotels;

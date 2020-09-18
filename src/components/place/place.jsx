import React from "react";
import "./place.css";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Place = (props) => {
  const { name, image } = props.placeData;
  return (
    <React.Fragment>
      <Col md={2}>
        <div
          className="place-box"
          onClick={() => props.handleShowPlace(props.placeData)}
        >
          <img src={image} alt="place capture" />
          <h2>{name}</h2>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default Place;

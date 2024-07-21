// Card.js
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomCard = ({ name, image, path }) => (
  <div>
    <Card className="top-category-card">
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title className="text-sm text-center font-bold cursor-pointer">
          <Link to={path} className="text-black">{name}</Link>
        </Card.Title>
      </Card.Body>
    </Card>
  </div>
);

export default CustomCard;

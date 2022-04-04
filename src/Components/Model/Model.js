import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Model.css";

const Model = (props) => {
  const { _id, name, founded, description, price, img, status } = props.car;
  return (
    <div className="d-md-flex">
      <Col>
        <Card
          style={{ width: "19rem" }}
          className="model-card border-0 mx-auto"
        >
          <Card.Img variant="top" src={img} className="img-fluid my-auto" />
          <Card.Title
            style={{ color: "brown", fontWeight: "900px" }}
            className="text-center"
          >
            {name}
          </Card.Title>
        </Card>
      </Col>
      <Col className="">
        <Card
          style={{ width: "19rem" }}
          className="model-card border-0 mx-auto"
        >
          <Card.Body className="model-info py-2">
            <Card.Text className="">
              <b>
                Launched in: <span style={{ color: "brown" }}> {founded}</span>
              </b>
            </Card.Text>
            <Card.Text className="">{description.slice(0, 115)}</Card.Text>
            <Card.Text className="">
              <b>
                {" "}
                <span style={{ color: "brown", fontSize: "20px" }}>
                  ${price}
                </span>
              </b>
            </Card.Text>
            <Card.Text className="">
              <b>
                {" "}
                <span style={{ color: "brown", fontSize: "20px" }}>
                  Status: {status}
                </span>
              </b>
            </Card.Text>
            <div className="">
              <Link to={`/purchase/${_id}`}>
                <Button
                  className="border-0"
                  style={{ backgroundColor: "skyblue", fontWeight: "600" }}
                >
                  Book Now
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default Model;

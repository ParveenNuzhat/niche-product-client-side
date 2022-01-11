import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import { FaStar } from "react-icons/fa";
import "./Home.css";
import StarRatingComponent from "react-star-rating-component";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [events, setEvents] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://mysterious-caverns-89933.herokuapp.com/cars")
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  useEffect(() => {
    fetch("https://mysterious-caverns-89933.herokuapp.com/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  useEffect(() => {
    fetch("https://mysterious-caverns-89933.herokuapp.com/review")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div>
      <Banner></Banner>
      <div>
        <h2
          className="text-center mt-5"
          style={{
            fontFamily: 'Montserrat", sans-serif',
            fontSize: "28px",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          Our{" "}
          <span
            style={{
              color: "orange",
              fontFamily: "Dancing Script, cursive",
              fontSize: "37px",
            }}
          >
            Vintage
          </span>{" "}
          Car Collection
        </h2>
        <Container className="mt-5 cars-container mb-5">
          <Row className="gy-5 gx-1">
            {cars.slice(0, 6).map((car) => (
              <Col md={4}>
                <Card
                  style={{
                    width: "20rem",
                    height: "450px",
                    minHeight: "450px",
                  }}
                  className="mx-auto car-card border-0"
                >
                  <Card.Img
                    variant="top"
                    src={car.img}
                    className="car-img"
                    style={{ height: "220px", minHeight: "220px" }}
                  />
                  <Card.Footer
                    className="d-md-flex align-items-center"
                    style={{
                      backgroundColor: "rgba(189,162,106,0.65)",
                      color: "#f6f4df",
                    }}
                  >
                    <div style={{ fontWeight: "bold", fontSize: "19px" }}>
                      ${car.price}
                    </div>
                    <div className="ms-auto">
                      <Link to={`/purchase/${car._id}`}>
                        <Button
                          className="border-0"
                          style={{
                            background: "none",
                            fontSize: "19px",
                            fontWeight: "bold",
                          }}
                        >
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </Card.Footer>
                  <Card.Body className="text-center">
                    <Card.Text
                      style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        color: "orange",
                      }}
                    >
                      {car.founded}
                    </Card.Text>
                    <Card.Title
                      className=""
                      style={{
                        fontSize: "21px",
                        fontFamily: "Merienda,cursive",
                        color: "brown",
                      }}
                    >
                      {car.name}
                    </Card.Title>
                    <Card.Text className="">
                      {car.description.slice(0, 100)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <div className="mt-5">
        <h2
          className="text-center"
          style={{
            fontFamily: 'Montserrat", sans-serif',
            fontSize: "28px",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          Take The{" "}
          <span
            style={{
              color: "orange",
              fontFamily: "Dancing Script, cursive",
              fontSize: "37px",
            }}
          >
            Royal
          </span>{" "}
          Ride
        </h2>
        <Container className="events-container mt-5">
          <Row className="">
            {events.map((event) => (
              <Col md={4}>
                <Card
                  style={{ width: "18 rem" }}
                  className="event-card border-0 p-2"
                >
                  <Card.Img
                    variant="top"
                    src={event.img}
                    className="event-img w-75 mx-auto img-fluid"
                    style={{ borderRadius: "150px" }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title
                      className=""
                      style={{
                        color: "orange",
                        fontFamily: "Aladin, cursive",
                        fontWeight: "500",
                        fontSize: "27px",
                      }}
                    >
                      {event.title}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <div className="mt-5  text-center">
        <h2
          className=""
          style={{
            fontFamily: 'Montserrat", sans-serif',
            fontSize: "28px",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          What Our
          <span
            style={{
              color: "orange",
              fontFamily: "Dancing Script, cursive",
              fontSize: "33px",
            }}
          >
            {" "}
            Happy{" "}
          </span>
          Customers Saying About Us!
        </h2>
        <Container className="my-5 w-75 mx-auto">
          <Row className="">
            {reviews.map((review) => (
              <Col md={4}>
                <Card
                  style={{ width: "18 rem" }}
                  className="review-card border-0 p-2"
                >
                  <Card.Img
                    variant="top"
                    src={review.img}
                    className="review-img w-25 mx-auto img-fluid"
                    style={{ borderRadius: "150px" }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title
                      className=""
                      style={{
                        color: "brown",
                        fontFamily: "Aladin, cursive",
                        fontWeight: "500",
                        fontSize: "27px",
                      }}
                    >
                      {review.name}
                    </Card.Title>
                    <StarRatingComponent
                      name="rate"
                      size={20}
                      editing={false}
                      renderStarIcon={() => (
                        <span>
                          <FaStar />
                        </span>
                      )}
                      starCount={5}
                      value={parseFloat(review.ratings)}
                    />
                    <Card.Text className="">
                      {review.comments.slice(0, 100)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;

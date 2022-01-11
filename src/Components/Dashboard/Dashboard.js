import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import AddCar from "../AddCar/AddCar";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import ManageBookings from "../ManageBookings/ManageBookings";
import ManageCars from "../ManageCars/ManageCars";
import MyBookings from "../MyBookings/MyBookings";
import Payment from "../Payment/Payment";
import Review from "../Review/Review";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  let { path, url } = useRouteMatch();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch(`https://mysterious-caverns-89933.herokuapp.com/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data[0]?.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      });
  }, [user?.email]);

  return (
    <div>
      <Container className="my-5 w-75 mx-auto py-5">
        <Row>
          <Col md={3} sm={12}>
            <Nav
              defaultActiveKey="/home"
              className="flex-column p-5"
              style={{
                height: "490px",
                backgroundColor: "#ffb84d",
                borderRadius: "10px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              <Nav.Link
                as={Link}
                to={`${url}`}
                className="bg-success text-white mt-3"
              >
                Dashboard
              </Nav.Link>
              {isAdmin ? (
                <>
                  <Nav.Link as={Link} to={`${url}/addProduct`}>
                    Add a Car
                  </Nav.Link>
                  <Nav.Link as={Link} to={`${url}/products`}>
                    Manage Cars
                  </Nav.Link>
                  <Nav.Link as={Link} to={`${url}/orders`}>
                    Manage All Bookings
                  </Nav.Link>
                  <Nav.Link as={Link} to={`${url}/admin`}>
                    Make Admin
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to={`${url}/payment`}>
                    Payment
                  </Nav.Link>
                  <Nav.Link as={Link} to={`${url}/bookings`}>
                    My Bookings
                  </Nav.Link>
                  <Nav.Link as={Link} to={`${url}/review`}>
                    Review
                  </Nav.Link>
                </>
              )}

              <Nav.Link
                role="button"
                onClick={() => logOut()}
                className="bg-success text-white"
              >
                Logout
              </Nav.Link>
            </Nav>
          </Col>

          <Col md={9} sm={12} className="text-center">
            <Switch>
              <Route path={`${path}/payment`}>
                <Payment></Payment>
              </Route>
              <Route path={`${path}/bookings`}>
                <MyBookings></MyBookings>
              </Route>
              <Route path={`${path}/review`}>
                <Review></Review>
              </Route>
              <Route path={`${path}/addProduct`}>
                <AddCar></AddCar>
              </Route>
              <Route path={`${path}/orders`}>
                <ManageBookings></ManageBookings>
              </Route>
              <Route path={`${path}/products`}>
                <ManageCars></ManageCars>
              </Route>
              <Route path={`${path}/admin`}>
                <MakeAdmin></MakeAdmin>
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;

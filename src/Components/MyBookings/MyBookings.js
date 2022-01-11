import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import "./MyBookings.css";

const MyBookings = () => {
  const { user } = useAuth();

  const [bookingList, setBookingList] = useState([]);
  const { totalPrice, setTotalPrice } = useAuth();

  useEffect(() => {
    fetch(
      `https://mysterious-caverns-89933.herokuapp.com/confirmBooking/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setBookingList(data));
  }, [user?.email]);

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure that you want to delete?");
    if (proceed) {
      const url = `https://mysterious-caverns-89933.herokuapp.com/confirmBooking/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount) {
            alert("successfully deleted");
            const remaining = bookingList.filter((bl) => bl._id !== id);
            setBookingList(remaining);
          }
        });
    }
  };

  const total = bookingList.reduce(
    (a, v) => (a = a + parseFloat(v.carInfo.price)),
    0
  );
  console.log(total);
  const handlePay = () => {
    setTotalPrice(total);
  };

  return (
    <div style={{ height: "45vh" }}>
      <h2
        className="text-center"
        style={{
          fontSize: "40px",
          fontWeight: "900",
          color: "orange",
          fontFamily: "Dancing Script, cursive",
        }}
      >
        My Bookings
      </h2>

      <div className="text-center payment-container mx-auto">
        <h4>Total Orders: {bookingList.length}</h4>

        <h4>Total Price: ${totalPrice}</h4>

        <Link to="/dashboard/payment">
          <button className="btn btn-info payment-btn" onClick={handlePay}>
            PAY NOW
          </button>
        </Link>
      </div>

      <Table striped bordered hover className="mt-5 w-75 mx-auto">
        <thead style={{ backgroundColor: "#cc99ff" }}>
          <tr>
            <th>Car Model</th>
            <th>Price($)</th>
            <th>Action</th>
          </tr>
        </thead>
        {bookingList.map((booking) => (
          <tbody>
            <tr>
              <td>
                <b>{booking?.carInfo?.name}</b>
              </td>
              <td>
                <b>{booking?.carInfo?.price}</b>
              </td>
              <td>
                <Button onClick={() => handleDelete(booking._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default MyBookings;

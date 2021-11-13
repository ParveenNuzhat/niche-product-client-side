import React, { useEffect, useState } from 'react';
import { Col, Form, Table } from 'react-bootstrap';

const ManageBookings = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('https://mysterious-caverns-89933.herokuapp.com/confirmBooking')
            .then(res => res.json())
            .then(data => setOrders(data))
    }, []);

    // Update status of
    const updateStatus = id => {
        const status = document.getElementById("status").value;
        const updatedInfo = { id, status }

        fetch(`https://mysterious-caverns-89933.herokuapp.com/confirmBooking/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Booking has been cancelled')
                }
            })
    }
    return (
        <div>
            <h1 className='text-center mb-5'>Manage Bookings</h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Ordered By</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order, index) =>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{order?.name}</td>
                            <td>{order?.address}</td>
                            <td>{order?.contact}</td>
                            <td>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Select id="status" onChange={() => updateStatus(order?._id)} defaultValue={order?.status}>
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Success">Success</option>
                                    </Form.Select>
                                </Form.Group>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table >
        </div>
    );
};

export default ManageBookings;
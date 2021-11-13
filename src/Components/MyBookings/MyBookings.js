import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import useAuth from '../../Hook/useAuth';

const MyBookings = () => {
    const { user } = useAuth();

    const [bookingList, setBookingList] = useState([]);

    useEffect(() => {
        fetch(`https://mysterious-caverns-89933.herokuapp.com/confirmBooking/${user.email}`)
            .then(res => res.json())
            .then(data => setBookingList(data))
    }, [user?.email])

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure that you want to delete?')
        if (proceed) {
            const url = `https://mysterious-caverns-89933.herokuapp.com/confirmBooking/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        alert('successfully deleted')
                        const remaining = bookingList.filter(bl => bl._id !== id)
                        setBookingList(remaining);
                    }
                })
        }
    }

    return (
        <div style={{ height: '45vh' }}>
            <h2 className='text-center'>My Bookings</h2>
            <Table striped bordered hover className='mt-5 w-75 mx-auto'>
                <thead style={{ backgroundColor: '#cc99ff' }}>
                    <tr>
                        <th>Car Model</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {bookingList.map(booking =>
                    <tbody>
                        <tr>
                            <td>{booking?.carInfo?.name}</td>
                            <td>$ {booking?.carInfo?.price}</td>
                            <td><Button onClick={() => handleDelete(booking._id)}>Delete</Button></td>
                        </tr>
                    </tbody>
                )}
            </Table>
        </div>
    );
};

export default MyBookings;
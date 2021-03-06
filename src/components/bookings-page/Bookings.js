import React, { useState, useEffect } from 'react';
import ticketService from '../../services/tickets';
import { Loader, Message } from 'semantic-ui-react';
import Booking from './Booking';

// Display list of bookings made by user

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch booking history from backend
    useEffect(() => {
        ticketService.getBookingHistory()
            .then(response => {
                setBookings(response);
                setLoading(false);
            })
            .catch(() => {
                setBookings([]);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {
                loading
                    ? <Loader active />
                    : (
                        bookings.length > 0
                            ? (
                                <div className='bookings-list'>
                                    {
                                        bookings.map(booking => (
                                            <Booking
                                                key={booking.id}
                                                booking={booking}
                                                setBookings={setBookings}
                                            />
                                        ))
                                    }
                                </div>
                            )
                            : (
                                <div className='no-data'>
                                    <Message info content='No bookings found.' compact />
                                </div>
                            )
                    )
            }
        </div>
    );
};

export default Bookings;
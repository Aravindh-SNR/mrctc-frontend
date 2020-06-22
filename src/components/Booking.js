import React, { useState } from 'react';
import { Segment, Header, Table, Button, Icon } from 'semantic-ui-react';
import ticketService from '../services/tickets';

const Booking = ({ booking, setBookings }) => {
    const [buyLoading, setBuyLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);

    const buyTicket = () => {
        setBuyLoading(true);
        ticketService.buyTicket(booking.id)
            .then(response => {
                setBuyLoading(false);
                setBookings(bookings => bookings.map(booking => {
                    if (booking.id === response.id) {
                        return response;
                    }
                    return booking;
                }))
            })
            .catch(() => {
                setBuyLoading(false);
            });
    };

    const cancelTicket = () => {
        setCancelLoading(true);
        const cancelledBookingId = booking.id;
        ticketService.cancelTicket(booking.id)
            .then(() => {
                setCancelLoading(false);
                setBookings(bookings => bookings.filter(booking => booking.id !== cancelledBookingId));
            })
            .catch(() => {
                setCancelLoading(false);
            });
    };

    return (
        <Segment>
            <Header>
                Booking ID: {booking.id}
            </Header>

            <p className='train-name'>{booking.trainId.name}</p>

            <p>Passengers:</p>
            <Table>
                <Table.Body>
                    {
                        booking.passengers.map(passenger => (
                            <Table.Row key={passenger.name}>
                                <Table.Cell width='1'>{passenger.name}</Table.Cell>
                                <Table.Cell width='1'>{passenger.age}</Table.Cell>
                                <Table.Cell width='1'>{passenger.gender}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>

            {
                booking.paid
                    ? (
                        <p>
                            Paid:&nbsp;
                            <Icon name='rupee' size='small' />{booking.totalAmount}
                        </p>
                    )
                    : (
                        <>
                            <p>
                                Total amount to be paid after deducting concessions, if any: {booking.totalAmount}
                            </p>

                            <Button
                                primary
                                content='Buy Ticket'
                                loading={buyLoading}
                                onClick={buyTicket}
                            />
                        </>
                    )
            }

            <Button
                content={booking.paid ? 'Cancel Ticket' : 'Discard Ticket'}
                loading={cancelLoading}
                onClick={cancelTicket}
            />
        </Segment>
    );
};

export default Booking;
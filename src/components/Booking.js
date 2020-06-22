import React, { useState } from 'react';
import { Segment, Header, Table, Button, Icon } from 'semantic-ui-react';
import ticketService from '../services/tickets';

const Booking = ({ booking }) => {
    const [buyLoading, setBuyLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);

    const buyTicket = () => {
        setBuyLoading(true);
        ticketService.buyTicket(booking.id)
            .then(() => {
                setBuyLoading(false);
                window.location = '/bookings';
            })
            .catch(() => {
                setBuyLoading(false);
            });
    };

    const cancelTicket = () => {
        setCancelLoading(true);
        ticketService.cancelTicket(booking.id)
            .then(() => {
                setCancelLoading(false);
                window.location = '/bookings';
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
                        <>
                            <p>
                                Total Amount paid after deducting concessions, if any:&nbsp;
                                <Icon name='rupee' size='small' />{booking.totalAmount}
                            </p>
                        </>
                    )
                    : (
                        <Button
                            primary
                            content='Buy Ticket'
                            loading={buyLoading}
                            onClick={buyTicket}
                        />
                    )
            }

            <Button
                content='Cancel Ticket'
                loading={cancelLoading}
                onClick={cancelTicket}
            />
        </Segment>
    );
};

export default Booking;
import React, { useState } from 'react';
import { Modal, Form, Header, Input, Select, Button, Table, Message } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import ticketService from '../services/tickets';
import Concessions from './Concessions';

const options = [
    { key: 'm', text: 'Male', value: 'M' },
    { key: 'f', text: 'Female', value: 'F' }
];

// Display modal with form for adding passengers

const AddPassengers = ({ selectedTrain, openCustomerModal, setOpenCustomerModal }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [passengers, setPassengers] = useState([]);
    const [errors, setErrors] = useState({ name: false, age: false, gender: false });
    const [loading, setLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState('');

    const history = useHistory();

    const updateGender = (e, { value }) => {
        setGender(value);
    };

    // Validate inputs before adding a passenger
    const validatePassenger = () => {
        if (!name.trim()) {
            setErrors({
                name: true,
                age: false,
                gender: false
            });
            return false;
        }
        if (!age || Number(age) < 0) {
            setErrors({
                age: true,
                name: false,
                gender: false
            });
            return false;
        }
        if (gender !== 'M' && gender !== 'F') {
            setErrors({
                gender: true,
                name: false,
                age: false
            });
            return false;
        }
        setErrors({
            name: false,
            age: false,
            gender: false
        });
        return true;
    };

    // Add current passenger to list
    const addPassenger = event => {
        event && event.preventDefault();
        if (!validatePassenger()) {
            return;
        }

        setPassengers(passengers => passengers.concat({ name, age, gender }));
        setName('');
        setAge('');
        setGender('');
    };

    const closeModal = () => {
        setName('');
        setAge('');
        setGender('');
        setPassengers([]);
        setErrors({
            name: false,
            age: false,
            gender: false
        });
        setOpenCustomerModal(false);
    };

    // Add ticket to cart
    const addToCart = event => {
        event.preventDefault();
        setServerMessage('');
        setLoading(true);
        ticketService.addToCart({
            trainId: selectedTrain.id,
            passengers
        })
            .then(() => {
                setLoading(false);
                history.push('/bookings');
            })
            .catch(() => {
                setLoading(false);
                setServerMessage('Sorry, something went wrong. Please try again.');
            });
    };

    return (
        <Modal
            open={openCustomerModal}
            as={Form}
            onSubmit={addToCart}
        >
            <Header>
                Add Passengers for <span className='train-name'>{selectedTrain.name}</span>
            </Header>

            <Modal.Content>
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Input}
                        label='Name'
                        placeholder='Enter Name'
                        autoFocus
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                        error={errors.name}
                    />

                    <Form.Field
                        control={Input}
                        label='Age'
                        placeholder='Enter Age'
                        type='number'
                        value={age}
                        onChange={({ target }) => setAge(target.value)}
                        error={errors.age}
                    />

                    <Form.Field
                        control={Select}
                        label='Gender'
                        options={options}
                        placeholder='Select Gender'
                        value={gender}
                        onChange={updateGender}
                        error={errors.gender}
                    />
                </Form.Group>

                <Button
                    primary
                    onClick={addPassenger}
                >
                    Add
                </Button>

                {
                    passengers.length > 0 &&
                    <Table>
                        <Table.Body>
                            {
                                passengers.map(passenger => (
                                    <Table.Row key={passenger.name}>
                                        <Table.Cell width='1'>{passenger.name}</Table.Cell>
                                        <Table.Cell width='1'>{passenger.age}</Table.Cell>
                                        <Table.Cell width='1'>{passenger.gender}</Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>
                }

                {
                    serverMessage &&
                    <Message
                        error
                        content={serverMessage}
                    />
                }

                <Concessions />
            </Modal.Content>

            <Modal.Actions>
                <Button
                    onClick={closeModal}
                    content='Cancel'
                />

                <Button
                    type='submit'
                    primary
                    content='Checkout'
                    disabled={passengers.length <= 0}
                    loading={loading}
                />
            </Modal.Actions>
        </Modal>
    );
};

export default AddPassengers;
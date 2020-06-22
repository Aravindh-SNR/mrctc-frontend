import React, { useState } from 'react';
import { Modal, Form, Button, Message, Header } from 'semantic-ui-react';
import trainService from '../services/trains';

// Display modal with form for updating price of train ticket

const UpdatePrice = ({ selectedTrain, openAdminModal, setOpenAdminModal }) => {
    const [price, setPrice] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState('');

    const closeModal = () => {
        setPrice('');
        setError(false);
        setOpenAdminModal(false);
    };

    // Validate price entered
    const validateInput = () => {
        if (!(price && Number(price) > 0)) {
            setError(true);
            return false;
        }
        setError(false);
        return true;
    };

    const updatePrice = event => {
        event.preventDefault();
        if (!validateInput()) {
            return;
        }

        setServerMessage('');
        setLoading(true);
        trainService.updatePrice(selectedTrain.id, price)
            .then(() => {
                setLoading(false);
                window.location = '/trains';
            })
            .catch(() => {
                setLoading(false);
                setServerMessage('Sorry, something went wrong. Please try again.');
            })
    }

    return (
        <Modal
            open={openAdminModal}
            as={Form}
            onSubmit={updatePrice}
        >
            <Header>
                Update ticket price for <span className='train-name'>{selectedTrain.name}</span>
            </Header>

            <Modal.Content>
                <Form.Input
                    autoFocus
                    autoComplete='off'
                    required
                    type='number'
                    value={price}
                    onChange={({ target }) => setPrice(target.value)}
                    error={error}
                    placeholder='Enter Price'
                />

                {
                    serverMessage &&
                    <Message
                        error
                        content={serverMessage}
                    />
                }
            </Modal.Content>

            <Modal.Actions>
                <Button
                    onClick={closeModal}
                    content='Cancel'
                />

                <Button
                    type='submit'
                    primary
                    content='Update Price'
                    loading={loading}
                />
            </Modal.Actions>
        </Modal>
    );
};

export default UpdatePrice;
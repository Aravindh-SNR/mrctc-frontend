import React, { useState } from 'react';
import { Form, Message, Button } from 'semantic-ui-react';
import trainService from '../services/trains';

const AddTrain = ({ setTrains }) => {
    const [name, setName] = useState('');
    const [station1, setStation1] = useState('');
    const [station2, setStation2] = useState('');
    const [price, setPrice] = useState('');

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    // Validate details of new train entered
    const validateInputs = () => {
        if (!name.trim()) {
            setErrors({
                name: true
            });
            return false;
        }
        
        if (!station1.trim()) {
            setErrors({
                station1: true
            });
            return false;
        }
        
        if (!station2.trim()) {
            setErrors({
                station2: true
            });
            return false;
        }

        if (station1.toLowerCase() === station2.toLowerCase()) {
            setErrors({
                station1: true,
                station2: true
            });
            return false;
        }
        
        if (!(price && Number(price) >= 0)) {
            setErrors({
                price: true
            });
            return false;
        }

        setErrors({});
        return true;
    };

    const addTrain = event => {
        event.preventDefault();
        setServerError('');
        if (!validateInputs()) {
            return;
        }

        setLoading(true);
        trainService.addTrain({
            name: name.toLowerCase(),
            stations: [station1, station2],
            price
        })
            .then(response => {
                setLoading(false);
                setName('');
                setStation1('');
                setStation2('');
                setPrice('');

                // Add newly created train to list of trains
                setTrains(trains => [response].concat(trains));
            })
            .catch(error => {
                setLoading(false);
                setServerError(
                    (error.response && error.response.data && error.response.data.error)
                        ? error.response.data.error
                        : 'Sorry, something went wrong. Please try again.'
                );
            });
    };

    return (
        <div id='add-train-form'>
            <Form loading={loading} onSubmit={addTrain}>
                <Form.Group widths='equal'>
                    <Form.Input
                        autoComplete='off'
                        value={name}
                        label='Train Name'
                        placeholder='Enter Train Name'
                        onChange={({ target }) => setName(target.value)}
                        error={errors.name}
                        required
                    />

                    <Form.Input
                        autoComplete='off'
                        value={station1}
                        label='Station 1'
                        placeholder='Enter Station 1'
                        onChange={({ target }) => setStation1(target.value)}
                        error={errors.station1}
                        required
                    />

                    <Form.Input
                        autoComplete='off'
                        value={station2}
                        label='Station 2'
                        placeholder='Enter Station 2'
                        onChange={({ target }) => setStation2(target.value)}
                        error={errors.station2}
                        required
                    />

                    <Form.Input
                        autoComplete='off'
                        value={price}
                        label='Price'
                        placeholder='Enter Price'
                        onChange={({ target }) => setPrice(target.value)}
                        type='number'
                        error={errors.price}
                        required
                    />
                </Form.Group>

                {
                    serverError &&
                    <Message
                        color='red'
                        content={serverError}
                    />
                }

                <Button
                    content='Add a Train'
                    primary
                />
            </Form>
        </div>
    );
};

export default AddTrain;
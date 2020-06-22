import React, { useState } from 'react';
import { Form, Button, Checkbox, Message } from 'semantic-ui-react';
import userService from '../services/users';

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// Component for user registration

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('customer');
    const [passcode, setPasscode] = useState('');
    const [errors, setErrors] = useState({ name: false, email: false });
    const [loading, setLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState({ success: false, error: false });

    // Switch userType between customer and admin to show additional passcode field for admin
    const switchUserType = () => {
        setPasscode('');
        if (userType === 'customer') {
            setUserType('admin');
        } else {
            setUserType('customer');
        }
    };

    //  Register user
    const register = event => {
        event.preventDefault();
        
        // Remove previous messages from server
        setServerMessage({ success: false, error: false });

        // Validate name and email
        let nameError = false, emailError = false;
        if (!(name && name.trim())) {
            nameError = {
                content: 'Please enter your name.',
                pointing: 'above'
            };
        }
        if (!emailRegex.test(email)) {
            emailError = {
                content: 'Please enter a valid email.',
                pointing: 'above'
            };
        }
        setErrors({ name: nameError, email: emailError });
        if (nameError || emailError) {
            return;
        }

        // Show loading animation in form
        setLoading(true);

        // Send request to backend
        userService.register({ name, email, password, userType, passcode })
            .then(response => {
                setLoading(false);
                setName('');
                setEmail('');
                setPassword('');
                setPasscode('');
                response.id && setServerMessage({
                    success: true,
                    header: `Welcome, ${response.name}!`,
                    content: 'Please log in now with your email and password.'
                });
            })
            .catch(error => {
                setLoading(false);
                setServerMessage({
                    error: true,
                    header: 'Registration unsuccessful',
                    content: (error.response && error.response.data && error.response.data.error)
                        ? error.response.data.error
                        : 'Oops, something went wrong. Please try again.'
                });
            });
    };

    return (
        <Form
            loading={loading}
            onSubmit={register}
            success={serverMessage.success}
            error={serverMessage.error}
        >
            <Form.Input
                required
                type='text'
                autoFocus
                autoComplete='off'
                fluid
                label='Name'
                placeholder='Enter Name'
                value={name}
                onChange={({ target }) => setName(target.value)}
                error={errors.name}
            />

            <Form.Input
                required
                autoComplete='off'
                fluid
                label='Email'
                placeholder='Enter Email'
                value={email}
                onChange={({ target }) => setEmail(target.value.trim().toLowerCase())}
                error={errors.email}
            />

            <Form.Input
                required
                type='password'
                autoComplete='off'
                fluid
                label='Password'
                placeholder='Enter Password'
                value={password}
                onChange={({ target }) => setPassword(target.value.trim())}
            />

            {
                userType === 'admin' &&
                <Form.Input
                    required
                    type='password'
                    autoComplete='off'
                    fluid
                    label='Passcode'
                    placeholder='Enter Passcode'
                    value={passcode}
                    onChange={({ target }) => setPasscode(target.value.trim())}
                />
            }

            <Form.Field
                control={Checkbox}
                label={{ children: 'Sign me up as an Admin' }}
                onClick={switchUserType}
            />

            {
                serverMessage.content &&
                <Message {...serverMessage} />
            }

            <Button
                type='submit'
                primary
            >
                Register
            </Button>
        </Form>
    );
};

export default RegistrationForm;
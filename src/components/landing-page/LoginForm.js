import React, { useState, useContext } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import userService from '../../services/users';
import { UserContext } from '../../contexts/UserContext';

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// Component for user login

const LoginForm = () => {
    const { setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: false });
    const [loading, setLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState({ error: false });

    //  Register user
    const login = event => {
        event.preventDefault();
        
        // Remove previous messages from server
        setServerMessage({ error: false });

        // Validate email
        let emailError = false;
        if (!emailRegex.test(email)) {
            emailError = {
                content: 'Please enter a valid email.',
                pointing: 'above'
            };
        }
        setErrors({ email: emailError });
        if (emailError) {
            return;
        }

        // Show loading animation in form
        setLoading(true);

        // Send request to backend
        userService.login({ email, password })
            .then(response => {
                setLoading(false);
                setUser(response.user);
            })
            .catch(error => {
                setLoading(false);
                setServerMessage({
                    error: true,
                    header: 'Login unsuccessful',
                    content: (error.response && error.response.data && error.response.data.error)
                        ? error.response.data.error
                        : 'Oops, something went wrong. Please try again.'
                });
            });
    };

    return (
        <Form
            loading={loading}
            onSubmit={login}
            error={serverMessage.error}
        >
            <Form.Input
                required
                autoFocus
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
                serverMessage.content &&
                <Message {...serverMessage} />
            }

            <Button
                type='submit'
                primary
            >
                Log in
            </Button>
        </Form>
    );
};

export default LoginForm;
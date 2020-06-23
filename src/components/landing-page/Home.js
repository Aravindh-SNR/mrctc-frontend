import React, { useState } from 'react';
import Banner from './Banner';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import { Menu } from 'semantic-ui-react';

// Component for the Home page

const Home = () => {
    // Which form to display - login or registration
    const [form, setForm] = useState('register');

    // Change form on menu click
    const changeForm = (e, { name }) => setForm(name);

    return (
        <div id='home-container'>
            <Banner />
            
            <div id='user-form'>
                <Menu fluid widths={2}>
                    <Menu.Item
                        name='register'
                        active={form === 'register'}
                        onClick={changeForm}
                    >
                        Register
                    </Menu.Item>

                    <Menu.Item
                        name='login'
                        active={form === 'login'}
                        onClick={changeForm}
                    >
                        Log In
                    </Menu.Item>
                </Menu>

                {
                    form === 'login'
                        ? <LoginForm />
                        : <RegistrationForm />
                }
            </div>
        </div>
    );
};

export default Home;
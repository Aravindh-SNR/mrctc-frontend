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
        
        
            <div className="radius-payment">
                <script src="https://getwyse.co/api/v1/payment/public/script/5fa164fb4a51e8cfe9d16798"></script>
                <a href="https://test.d2l73345k57zd1.amplifyapp.com/@aravindh-academy/5fa164fb4a51e8cfe9d16798" target="radius-payment-frame" style="display: none;" className="radius-payment-btn btn btn-primary font-12">
                    Pay Now
                </a>
            </div>
    
        </div>
    );
};

export default Home;

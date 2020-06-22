import React from 'react';
import notFoundImage from '../images/not-found.jpg';
import { Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// Component to be displayed for an invalid route

const NotFound = () => {
    return (
        <div id='not-found'>
            <Header>
                The page you requested does not exist.&nbsp;
                <Link to='/'>Let's go home.</Link>
            </Header>

            <Image src={notFoundImage} size='big' alt='Not Found' />
        </div>
    );
};

export default NotFound;
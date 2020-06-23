import React from 'react';
import train from '../../images/train.jpg';
import { Image, Header } from 'semantic-ui-react';

// Component for displaying banner heading and image on Home page

const Banner = () => {
    return (
        <div id='banner'>
            <Header>
                A sample rail e-ticketing app for Metropolitan cities of India
            </Header>

            <Image src={train} alt='Train' size='big' rounded />
        </div>
    );
};

export default Banner;
import React from 'react';
import { Message } from 'semantic-ui-react';

const Concessions = () => {
    return (
        <Message info>
            <Message.Header>Concessions applicable:</Message.Header>

            <Message.List>
                <Message.Item>100% for children below 5 years</Message.Item>
                
                <Message.Item>50% for children between 5 and 11 years, and female senior citizens who are 58+</Message.Item>

                <Message.Item>40% for male senior citizens who are 60+</Message.Item>
            </Message.List>
        </Message>
    );
};

export default Concessions;
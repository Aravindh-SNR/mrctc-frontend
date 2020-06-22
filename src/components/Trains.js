import React, { useState, useEffect, useContext } from 'react';
import trainService from '../services/trains';
import Train from './Train';
import { Loader, Message, Header } from 'semantic-ui-react';
import { UserContext } from '../contexts/UserContext';
import AddPassengers from './AddPassengers';
import UpdatePrice from './UpdatePrice';
import AddTrain from './AddTrain';

// Display list of trains

const Trains = () => {
    const { user } = useContext(UserContext);

    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedTrain, setSelectedTrain] = useState({});
    const [openCustomerModal, setOpenCustomerModal] = useState(false);
    const [openAdminModal, setOpenAdminModal] = useState(false);

    // Fetch list of trains from back end
    useEffect(() => {
        trainService.getTrains()
            .then(response => {
                setTrains(response);
                setLoading(false);
            })
            .catch(() => {
                setTrains([]);
                setLoading(false);
            });
    }, []);

    // Display call to action message based on user type
    const getHeader = () => {
        let message;
        const condition = user || {};

        switch (condition.userType) {
            case 'customer':
                message = 'Select a train to book tickets';
                break;
            case 'admin':
                message = 'Select a train to update its price';
                break;
            default:
                message = 'Please log in to book tickets';
        }

        return (
            <Header
                content={message}
                textAlign='center'
                id='call-to-action-message'
            />
        );
    };

    return (
        <div>
            {
                loading
                    ? <Loader active />
                    : (
                        trains.length > 0
                            ? (
                                <>
                                    {
                                        (user && user.userType === 'admin') &&
                                        <AddTrain
                                            setTrains={setTrains}
                                        />
                                    }

                                    {getHeader()}

                                    <UpdatePrice
                                        selectedTrain={selectedTrain}
                                        openAdminModal={openAdminModal}
                                        setOpenAdminModal={setOpenAdminModal}
                                    />

                                    <AddPassengers
                                        selectedTrain={selectedTrain}
                                        openCustomerModal={openCustomerModal}
                                        setOpenCustomerModal={setOpenCustomerModal}
                                    />

                                    <div className='train-list'>
                                        {
                                            trains.map(train => (
                                                <Train
                                                    key={train.id}
                                                    train={train}
                                                    setSelectedTrain={setSelectedTrain}
                                                    setOpenCustomerModal={setOpenCustomerModal}
                                                    setOpenAdminModal={setOpenAdminModal}
                                                />
                                            ))
                                        }
                                    </div>
                                </>
                            )
                            : (
                                <div className='no-data'>
                                    <Message info content='Sorry, no data found.' compact />
                                </div>
                            )
                    )
            }
        </div>
    );
};

export default Trains;
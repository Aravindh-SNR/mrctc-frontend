import React, { useContext } from 'react';
import { Icon } from 'semantic-ui-react';
import { UserContext } from '../../contexts/UserContext';

// Display one train card

const Train = ({
    train,
    setSelectedTrain,
    setOpenCustomerModal,
    setOpenAdminModal
}) => {
    const { user } = useContext(UserContext);

    // Open appropriate modal to peform actions (book tickets/update ticket price) based on user type
    const handleClick = () => {
        if (!user) {
            return;
        }

        setSelectedTrain(train);
        user.userType === 'customer'
            ? setOpenCustomerModal(true)
            : setOpenAdminModal(true);
    };

    return (
        <div className='train-item' onClick={handleClick}>
            <h3 className='train-name'>{train.name}</h3>
            <div>{train.stations[0]} <Icon name='arrows alternate horizontal' />{train.stations[1]}</div>
            <div><Icon name='rupee' size='small' />{train.price}</div>
        </div>
    );
};

export default Train;
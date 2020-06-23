import React, { useContext, useEffect, useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import userService from '../services/users';

// Top navigation bar

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);

    const [activeMenu, setActiveMenu] = useState('');

    const location = useLocation();

    // Update active menu every time route changes
    useEffect(() => {
        setActiveMenu(location.pathname.slice(1));
    }, [location]);

    const logout = () => {
        userService.logout();
        setUser(null);
    };

    return (
        <Menu id='navbar' fluid borderless stackable>
            <Menu.Item as={Link} to='/'>
                <div id='app-heading'>
                    <Icon name='train' size='big' color='blue' />
                    <span>MRCTC</span>
                </div>
            </Menu.Item>

            <Menu.Item
                header
                position='right'
                as={Link}
                to='/trains'
                className={activeMenu === 'trains' ? 'active-menu' : ''}
            >
                Browse Trains
            </Menu.Item>

            {/* Display My Bookings option for customer */}
            {
                (user && user.userType === 'customer') &&
                <Menu.Item
                    header
                    position='right'
                    as={Link}
                    to='/bookings'
                    className={activeMenu === 'bookings' ? 'active-menu' : ''}
                >
                    My Bookings
                </Menu.Item>
            }

            {/* Display Log Out option for both customer and admin */}
            {
                user &&
                <Menu.Item
                    header
                    position='right'
                    onClick={logout}
                    style={{ cursor: 'pointer' }}
                >
                    Log Out
                </Menu.Item>
            }
        </Menu>
    );
};

export default Navbar;
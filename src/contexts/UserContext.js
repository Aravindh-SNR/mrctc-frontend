import React, { useState, createContext } from 'react';

export const UserContext = createContext();

// Provide details of the logged in user to the component tree

const UserContextProvider = props => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    return (
        <UserContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
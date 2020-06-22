import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import { UserContext } from '../contexts/UserContext';
import NotFound from '../components/NotFound';
import Trains from '../components/Trains';
import Bookings from '../components/Bookings';

// Routing component

const AppRouter = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <BrowserRouter>
                <Navbar />

                <Switch>
                    <Route
                        exact
                        path='/'
                        render={() => {
                            return user
                                ? <Redirect to='/trains' />
                                : <Home />
                        }}
                    />

                    <Route
                        exact
                        path='/trains'
                        component={Trains}
                    />

                    <Route
                        exact
                        path='/bookings'
                        render={() => {
                            return (user && user.userType === 'customer')
                                ? <Bookings />
                                : <Redirect to='/' />
                        }}
                    />

                    {/* Handle invalid routes */}
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default AppRouter;
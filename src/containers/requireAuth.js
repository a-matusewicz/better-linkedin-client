/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, user, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => (user.auth ? (
                <Component {...props} />
            ) : (
                <Redirect to="/signin" />
            ))}
        />
    );
}

export default PrivateRoute;

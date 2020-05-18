import React from 'react';
import Error from './error';

// Displays list of events user is a part of
const EventList = (props) => {
    return (
        <div className="new-content">
            <Error />
            Events for {props.user.username}!
        </div>
    );
};

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default EventList;

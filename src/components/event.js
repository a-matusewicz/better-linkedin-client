import React, { Component } from 'react';
import {
    BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import Error from './error';

// Menu page for user to choose between viewing list of their events or creating new event
class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validated: false,
        };
    }

    render() {
        const { validated } = this.state;
        return (
            <div className="new-content">
                <Error />
                <NavLink to="/eventlist" exact>My Events</NavLink>
                <NavLink to="/createevent" exact>Create Event</NavLink>
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default Event;

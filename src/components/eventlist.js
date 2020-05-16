import React, { Component } from 'react';
import Error from './error';

// Displays list of events user is a part of
class EventList extends Component {
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
                Events for {this.props.user.username}!
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default EventList;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUserEvents } from '../actions';
import Error from './error';

// Displays list of events user is a part of
class EventList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventList: [],
        };
    }

    componentDidMount() {
        this.props.fetchUserEvents(this.props.user.id, (eventList) => { this.setState({ eventList }); });
    }

    // Retrieves events for current person8
    getEventsList = () => {
        // Get events from
        this.props.fetchUserEvents(this.props.user.id, this.props.history);

        return (
            <ul>
                {this.state.eventList.map((item) => {
                    return <li key={item.EventID}>{item.EventName}, {item.EventTime}</li>;
                })}
            </ul>
        );
    }

    render() {
        return (
            <div className="new-content">
                <Error />
                All events you have committed to:
                <div>
                    {this.getEventsList()}
                </div>
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, { fetchUserEvents })(EventList));

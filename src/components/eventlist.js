import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
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
        // Get list of events for current user
        this.props.fetchUserEvents(this.props.user.id, (eventList) => { this.setState({ eventList }); });
    }

    // Retrieves events for current person8
    getEventsList = () => {
        return (
            <ul>
                {this.state.eventList.map((item) => {
                    return (
                        <li key={item.EventID}>
                            {/* eslint-disable-next-line max-len */}
                            <NavLink to={`/eventinfo/${item.EventID},${item.EventName},${item.EventTime},${item.EventDescription},${item.IndustryName},${1},${item.IsOrganizer},${item.OrganizerEmail}`} exact>
                                {item.EventName}, {(new Date(item.EventTime)).toLocaleDateString()}
                            </NavLink>
                        </li>
                    );
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

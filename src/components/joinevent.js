import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    // eslint-disable-next-line no-unused-vars
    withRouter, BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import { fetchEvents, fetchUserEvents } from '../actions';
import Error from './error';

// Displays list of events user is a part of
class JoinEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventList: [],
            userEventList: [],
        };
    }

    componentDidMount() {
        // Get list of all events
        this.props.fetchEvents((eventList) => { this.setState({ eventList }); });
        // Get list of events for current user
        this.props.fetchUserEvents(this.props.user.id, (userEventList) => {
            const IDList = [];
            // eslint-disable-next-line no-unused-vars
            for (const [index, value] of userEventList.entries()) {
                IDList.push(value.EventID);
            }
            this.setState({ userEventList: IDList });
        });
    }

    // Retrieves events for current person8
    getEventsList = () => {
        return (
            <ul>
                {this.state.eventList.map((item) => {
                    // If the user is participating in this event already, then pass that info to eventinfo page
                    if (this.state.userEventList.includes(item.EventID)) {
                        return (
                            <li key={item.EventID}>
                                {/* eslint-disable-next-line max-len */}
                                <NavLink to={`/eventinfo/${item.EventID},${item.EventName},${item.EventTime},${item.EventDescription},${item.IndustryID},${1}`} exact>{item.EventName}, {item.EventTime}</NavLink>
                            </li>
                        );
                    } else {
                        return (
                            <li key={item.EventID}>
                                {/* eslint-disable-next-line max-len */}
                                <NavLink to={`/eventinfo/${item.EventID},${item.EventName},${item.EventTime},${item.EventDescription},${item.IndustryID},${0}`} exact>{item.EventName}, {item.EventTime}</NavLink>
                            </li>
                        );
                    }
                })}
            </ul>
        );
    }

    render() {
        return (
            <div className="new-content">
                <Error />
                All events:
                <div>
                    {this.getEventsList()}
                </div>
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, { fetchEvents, fetchUserEvents })(JoinEvent));

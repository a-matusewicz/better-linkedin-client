import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
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
                        // If the user is the organizer
                        if (item.OrganizerID === this.props.user.id) {
                            return (
                                <li key={item.EventID}>
                                    <NavLink exact
                                        to={{
                                            pathname: '/eventinfo/',
                                            eventData: {
                                                id: item.EventID,
                                                name: item.EventName,
                                                time: item.EventTime,
                                                desc: item.EventDescription,
                                                ind: item.IndustryName,
                                                participating: 1,
                                                isorg: 1,
                                                orgemail: item.OrganizerEmail,
                                                originpath: '/joinevent',
                                            },
                                        }}
                                    >
                                        {item.EventName}, {(new Date(item.EventTime)).toLocaleDateString()}
                                    </NavLink>
                                </li>
                            );
                        } else {
                            return (
                                <li key={item.EventID}>
                                    <NavLink exact
                                        to={{
                                            pathname: '/eventinfo/',
                                            eventData: {
                                                id: item.EventID,
                                                name: item.EventName,
                                                time: item.EventTime,
                                                desc: item.EventDescription,
                                                ind: item.IndustryName,
                                                participating: 1,
                                                isorg: 0,
                                                orgemail: item.OrganizerEmail,
                                                originpath: '/joinevent',
                                            },
                                        }}
                                    >
                                        {item.EventName}, {(new Date(item.EventTime)).toLocaleDateString()}
                                    </NavLink>
                                </li>
                            );
                        }
                    } else {
                        return (
                            <li key={item.EventID}>
                                <NavLink exact
                                    to={{
                                        pathname: '/eventinfo/',
                                        eventData: {
                                            id: item.EventID,
                                            name: item.EventName,
                                            time: item.EventTime,
                                            desc: item.EventDescription,
                                            ind: item.IndustryName,
                                            participating: 0,
                                            isorg: 0,
                                            orgemail: item.OrganizerEmail,
                                            originpath: '/joinevent',
                                        },
                                    }}
                                >
                                    {item.EventName}, {(new Date(item.EventTime)).toLocaleDateString()}
                                </NavLink>
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
                <Button onClick={() => this.props.history.push('/event')}>Back</Button>
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, { fetchEvents, fetchUserEvents })(JoinEvent));

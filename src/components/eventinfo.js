import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { RSVP, unRSVP, deleteEvent } from '../actions';
import Error from './error';

// Displays list of events user is a part of
class EventInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    // Retrieves events for current person8
    handleIndustry = () => {
        if (this.props.match.params.ind !== 'null') {
            return (<div>{this.props.match.params.ind}</div>);
        } else {
            return (<div>No assigned industry</div>);
        }
    }

    handleButton = () => {
        // If participating, allow for un-RSVP; if organizer, allow for deleting
        if (this.props.match.params.participating === '1') {
            if (this.props.match.params.isorg === '1') {
                return (<Button onClick={() => this.props.deleteEvent(this.props.match.params.id, this.props.history)}>Delete</Button>);
            } else {
                return (<Button onClick={() => this.props.unRSVP(this.props.user.id, this.props.match.params.id, this.props.history)}>un-RSVP</Button>);
            }
        // Else, allow for RSVP
        } else {
            const RSVPRecord = {
                PersonID: this.props.user.id,
                EventID: this.props.match.params.id,
            };
            // eslint-disable-next-line new-cap
            return (<Button onClick={() => this.props.RSVP(RSVPRecord, this.props.history)}>RSVP</Button>);
        }
    }

    render() {
        return (
            <div className="new-content">
                <Error />
                <div>
                    {this.props.match.params.name}
                </div>
                <div>
                    {(new Date(this.props.match.params.time)).toLocaleDateString()}
                </div>
                <div>
                    {this.handleIndustry()}
                </div>
                <div>
                    {this.props.match.params.isorg}
                </div>
                <div>
                    {this.props.match.params.desc}
                </div>
                {this.handleButton()}
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, { RSVP, unRSVP, deleteEvent })(EventInfo));

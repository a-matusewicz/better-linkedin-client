import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Error from './error';

// Displays list of events user is a part of
class Person extends Component {
    // Retrieves events for current person8
    handleIndustry = () => {
        if (this.props.user.industry) {
            return this.props.user.industry;
        } else {
            return 'No assigned industry';
        }
    }

    renderEvent = () => {
        return (
            <div className="new-content">
                <Error />
                <div className="title">View Profile</div>
                <div>
                    {this.props.user.first_name} {this.props.user.last_name}
                </div>
                <div>
                    Email: {this.props.user.email}
                </div>
                <div>
                    Industry: {this.handleIndustry()}
                </div>
                <div>
                    {this.props.user.description}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="event">
                {this.renderEvent()}
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, null)(Person));

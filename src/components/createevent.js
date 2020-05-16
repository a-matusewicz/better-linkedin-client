import React, { Component } from 'react';
import Error from './error';

// Create a new event
class CreateEvent extends Component {
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
                Create new event:
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default CreateEvent;

import React, { Component } from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { withRouter, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Error from './error';

class Employment extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="new-content">
                <Error />
                <NavLink to="/listemployment" exact>My Employment History</NavLink>
                <NavLink to="/addemployment" exact>Add a Job</NavLink>

                <Button onClick={() => this.props.history.push('/')}>Back</Button>
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, null)(Employment));

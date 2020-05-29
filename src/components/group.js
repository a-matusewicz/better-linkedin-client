import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Error from './error';

// Menu page for user to choose between viewing list of their groups or creating new group
class Group extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="new-content">
                <Error />
                <NavLink to="/grouplist" exact>My Groups</NavLink>
                <NavLink to="/creategroup" exact>Create a Group</NavLink>
                <NavLink to="/joingroup" exact>All Groups</NavLink>
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, null)(Group));

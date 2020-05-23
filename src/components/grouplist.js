import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { fetchUserGroups } from '../actions';
import Error from './error';

// Displays list of groups user is a part of
class GroupList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupList: [],
        };
    }

    componentDidMount() {
        // Get list of groups for current user
        this.props.fetchUserGroups(this.props.user.id, (groupList) => { this.setState({ groupList }); });
    }

    // Retrieves groups for current person8
    getGroupsList = () => {
        return (
            <ul>
                {this.state.groupList.map((item) => {
                    return (
                        <li key={item.GroupID}>
                            <NavLink exact
                                to={{
                                    pathname: '/groupinfo/',
                                    groupData: {
                                        id: item.GroupID,
                                        name: item.GroupName,
                                        desc: item.GroupDescription,
                                        ind: item.IndustryName,
                                        participating: 1,
                                        isorg: item.IsOrganizer,
                                        orgemail: item.OrganizerEmail,
                                        originpath: '/grouplist',
                                    },
                                }}
                            >
                                {item.GroupName}
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
                All groups you have committed to:
                <div>
                    {this.getGroupsList()}
                </div>
                <Button onClick={() => this.props.history.push('/group')}>Back</Button>
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, { fetchUserGroups })(GroupList));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { fetchGroups, fetchUserGroups } from '../actions';
import Error from './error';

// Displays list of groups user is a part of
class JoinGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupList: [],
            userGroupList: [],
        };
    }

    componentDidMount() {
        // Get list of all groups
        this.props.fetchGroups((groupList) => { this.setState({ groupList }); });
        // Get list of groups for current user
        this.props.fetchUserGroups(this.props.user.id, (userGroupList) => {
            const IDList = [];
            // eslint-disable-next-line no-unused-vars
            for (const [index, value] of userGroupList.entries()) {
                IDList.push(value.GroupID);
            }
            this.setState({ userGroupList: IDList });
        });
    }

    // Retrieves groups for current person8
    getGroupsList = () => {
        return (
            <ul>
                {this.state.groupList.map((item) => {
                    // If the user is participating in this group already, then pass that info to groupinfo page
                    if (this.state.userGroupList.includes(item.GroupID)) {
                        // If the user is the organizer
                        if (item.OrganizerID === this.props.user.id) {
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
                                                isorg: 1,
                                                orgemail: item.OrganizerEmail,
                                                originpath: '/joingroup',
                                            },
                                        }}
                                    >
                                        {item.GroupName}
                                    </NavLink>
                                </li>
                            );
                        } else {
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
                                                isorg: 0,
                                                orgemail: item.OrganizerEmail,
                                                originpath: '/joingroup',
                                            },
                                        }}
                                    >
                                        {item.GroupName}
                                    </NavLink>
                                </li>
                            );
                        }
                    } else {
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
                                            participating: 0,
                                            isorg: 0,
                                            orgemail: item.OrganizerEmail,
                                            originpath: '/joingroup',
                                        },
                                    }}
                                >
                                    {item.GroupName}
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
                All groups:
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
export default withRouter(connect(null, { fetchGroups, fetchUserGroups })(JoinGroup));

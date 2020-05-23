import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { joinGroup, leaveGroup, deleteGroup } from '../actions';
import Error from './error';

// Displays list of groups user is a part of
class GroupInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    // Retrieves groups for current person
    handleIndustry = () => {
        if (this.props.location.groupData.ind !== 'null') {
            return (<div>{this.props.location.groupData.ind}</div>);
        } else {
            return (<div>No assigned industry</div>);
        }
    }

    handleButton = () => {
        // If participating, allow for leaving; if organizer, allow for deleting
        if (this.props.location.groupData.participating === 1) {
            if (this.props.location.groupData.isorg === 1) {
                return (<Button onClick={() => this.props.deleteGroup(this.props.location.groupData.id, this.props.history)}>Delete</Button>);
            } else {
                return (<Button onClick={() => this.props.leaveGroup(this.props.user.id, this.props.location.groupData.id, this.props.history)}>Leave Group</Button>);
            }
        // Else, allow for joining
        } else {
            const MemberRecord = {
                PersonID: this.props.user.id,
                GroupID: this.props.location.groupData.id,
            };
            // eslint-disable-next-line new-cap
            return (<Button onClick={() => this.props.joinGroup(MemberRecord, this.props.history)}>Join Group</Button>);
        }
    }

    render() {
        console.log(this.props.location);
        return (
            <div className="new-content">
                <Error />
                <div>
                    {this.props.location.groupData.name}
                </div>
                <div>
                    {this.handleIndustry()}
                </div>
                <div>
                    Organizer email: {this.props.location.groupData.orgemail}
                </div>
                <div>
                    {this.props.location.groupData.desc}
                </div>
                {this.handleButton()}
                <Button onClick={() => this.props.history.push(this.props.location.groupData.originpath)}>Back</Button>
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, { joinGroup, leaveGroup, deleteGroup })(GroupInfo));

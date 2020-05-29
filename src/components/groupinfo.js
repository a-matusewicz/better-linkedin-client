import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {
    joinGroup,
    leaveGroup,
    deleteGroup,
    updateGroup,
    fetchIndustries,
} from '../actions';
import Error from './error';

// Displays list of groups user is a part of
class GroupInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            name: this.props.location.groupData.name,
            desc: this.props.location.groupData.desc,
            ind: this.props.location.groupData.ind,
            industryList: [],
        };
    }

    componentDidMount() {
        // Get list of industries
        this.props.fetchIndustries((industryList) => { this.setState({ industryList }); });
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
            return (<Button onClick={() => this.props.joinGroup(MemberRecord, this.props.history)}>Join Group</Button>);
        }
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeTwo = () => {
        const newID = document.getElementById('group_industry').value;
        console.log(newID);

        this.setState({ ind: newID });
    };


    updateGroup = () => {
        const group = {
            name: this.state.name,
            desc: this.state.desc,
            ind: this.state.ind,
            user: this.props.user.id,
        };

        this.props.updateGroup(this.props.location.groupData.id, group);
        this.setState({
            isEditing: false,
        });
    }

    // Retrieves groups for current person8
    getIndustries = () => {
        return (
            this.state.industryList.map((item) => {
                return (
                    <option selected={item.IndustryID === this.state.ind} key={item.IndustryID} value={this.state.ind}>{item.IndustryName}</option>
                );
            })
        );
    }

    renderGroup = () => {
        if (this.state.isEditing) {
            return (
                <div className="new-content">
                    <div className="title">Edit group</div>
                    <Form noValidate>
                        <Form.Row>
                            <Form.Group controlId="group_name">
                                <Form.Label>Group Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={this.state.name}
                                    maxLength={255}
                                    onChange={this.handleChange('name')}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="group_industry">
                                <Form.Label>Industry</Form.Label>
                                <Form.Control as="select" value={this.state.ind} onChange={this.handleChangeTwo}>
                                    {this.getIndustries()}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="group_desc">
                                <Form.Label>Group Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    maxLength={255}
                                    value={this.state.desc}
                                    onChange={this.handleChange('desc')}
                                />

                            </Form.Group>
                        </Form.Row>
                        <div className="buttons">
                            <Button onClick={() => {
                                this.updateGroup(
                                );
                                this.setState({ isEditing: false });
                            }}
                            >Update
                            </Button>
                            <Button onClick={() => { this.setState({ isEditing: false }); }}>Cancel</Button>
                        </div>
                    </Form>
                </div>

            );
        } else {
            console.log(this.props.location);
            return (
                <div className="new-content">
                    <Error />
                    <div>
                        {this.state.name}
                    </div>
                    <div>
                        {this.handleIndustry()}
                    </div>
                    <div>
                        Organizer email: {this.props.location.groupData.orgemail}
                    </div>
                    <div>
                        {this.state.desc}
                    </div>
                    {this.handleButton()}
                    <Button onClick={() => {
                        this.setState({
                            isEditing: true,
                        });
                    }}
                    >Edit
                    </Button>
                    <Button onClick={() => this.props.history.push(this.props.location.groupData.originpath)}>Back</Button>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="group">
                {this.renderGroup()}
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, {
    joinGroup, leaveGroup, deleteGroup, updateGroup, fetchIndustries,
})(GroupInfo));

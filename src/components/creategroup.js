import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { createGroup, fetchIndustries } from '../actions';
import Error from './error';

// Create a new group
class CreateGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validated: false,
            industryList: [],
            chosenID: 1,
        };
    }

    componentDidMount() {
        // Get list of industries
        this.props.fetchIndustries((industryList) => { this.setState({ industryList }); });
    }

    // Submits create for new group
    handleSubmit = (group) => {
        const form = group.currentTarget;
        const groupName = document.getElementById('group_name').value;
        const groupDesc = document.getElementById('group_desc').value;
        this.setState({ validated: false });
        group.preventDefault();
        if (form.checkValidity() === false) {
            group.preventDefault();
            group.stopPropagation();
        } else {
            const newGroup = {
                groupName,
                groupDesc,
                industryID: this.state.chosenID,
                userID: this.props.user.id,
            };
            this.props.createGroup(newGroup, this.props.history);
        }

        this.setState({ validated: true });
    }

    handleChange = () => {
        const newID = document.getElementById('group_industry').value;
        this.setState({ chosenID: newID });
    }

    // Retrieves groups for current person8
    getIndustries = () => {
        return (
            this.state.industryList.map((item) => {
                return (
                    <option key={item.IndustryID} value={item.IndustryID}>{item.IndustryName}</option>
                );
            })
        );
    }

    render() {
        const { validated } = this.state;
        return (
            <div className="new-content">
                <Error />
                <div className="title">Create new group:</div>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={(e) => this.handleSubmit(e)}
                >
                    <Form.Row>
                        <Form.Group controlId="group_name">
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Group Name"
                                maxLength={255}
                            />
                            <Form.Control.Feedback type="invalid" id="group-name-feedback">
                                Please enter an group name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="group_industry">
                            <Form.Label>Industry</Form.Label>
                            <Form.Control as="select" value={this.state.chosenID} onChange={this.handleChange}>
                                {this.getIndustries()}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" id="group-industry-feedback">
                                Please enter an industry.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="group_desc">
                            <Form.Label>Group Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Description"
                                required
                                maxLength={255}
                            />
                            <Form.Control.Feedback type="invalid" id="group-desc-feedback">
                                Please enter a description.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <div className="buttons">
                        <Button type="submit" variant="success">Submit</Button>
                    </div>
                </Form>
                <Button onClick={() => this.props.history.push('/group')}>Back</Button>
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, { createGroup, fetchIndustries })(CreateGroup));

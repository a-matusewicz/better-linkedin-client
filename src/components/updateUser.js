import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { updateUser } from '../actions';
import Error from './error';

// this can be dumb or smart component - connect works with either
class UpdateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validated: false,
        };
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        const username = document.getElementById('username').value;
        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const education = document.getElementById('current_education').value;
        const job = document.getElementById('current_job').value;
        this.setState({ validated: false });
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const user = {
                username,
                first_name: firstName,
                last_name: lastName,
                education,
                job,
            };
            this.props.updateUser(user, this.props.history, this.props.editUser);
        }

        this.setState({ validated: true });
    }

    render() {
        const { validated } = this.state;
        if (this.props.user.auth) {
            return (
                <div className="new-content">
                    <Error />
                    <Button type="submit" variant="danger" onClick={this.handleSignOut}>Edit User Profile</Button>
                </div>
            );
        } else {
            return (
                <div className="new-content">
                    <Error />
                    <div className="title">Edit User Profile</div>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={(e) => this.handleSubmit(e)}
                    >
                        <Form.Row>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Username"
                                />
                                <Form.Control.Feedback type="invalid" id="username-feedback">
                                    Please enter a Username.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="first_name">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    required
                                />
                                <Form.Control.Feedback type="invalid" id="fn-feedback">
                                    Please enter your first name.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="last_name">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    required
                                />
                                <Form.Control.Feedback type="invalid" id="ln-feedback">
                                    Please enter your last name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="current_education">
                                <Form.Label>Current School</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Current School"
                                />
                                <Form.Control.Feedback type="invalid" id="current-education-feedback">
                                    Please enter a school name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="current_job">
                                <Form.Label>Current Job</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Current Job"
                                />
                                <Form.Control.Feedback type="invalid" id="current-job-feedback">
                                    Please enter a job title.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <div className="buttons">
                            <Button type="submit" variant="success">Submit</Button>
                        </div>
                    </Form>
                </div>
            );
        }
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, { updateUser })(UpdateUser));

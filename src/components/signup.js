import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { createUser, signoutUser } from '../actions';
import Error from './error';

// this can be dumb or smart component - connect works with either
class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validated: false,
        };
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        this.setState({ validated: false });
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const user = {
                email,
                password,
                first_name: firstName,
                last_name: lastName,
            };
            this.props.createUser(user, this.props.history, this.props.editUser);
        }

        this.setState({ validated: true });
    }

    handleSignOut = () => {
        this.props.signoutUser(this.props.history, this.props.editUser);
    }

    render() {
        const { validated } = this.state;
        if (this.props.user.auth) {
            return (
                <div className="new-content">
                    <Error />
                    <Button type="submit" variant="danger" onClick={this.handleSignOut}>Sign Out</Button>
                </div>
            );
        } else {
            return (
                <div className="new-content">
                    <Error />
                    <div className="title">Sign Up</div>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={(e) => this.handleSubmit(e)}
                    >
                        <Form.Row>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Email"
                                    maxLength={255}
                                />
                                <Form.Control.Feedback type="invalid" id="email-feedback">
                                    Please enter an Email.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Password"
                                    required
                                    maxLength={255}
                                />
                                <Form.Control.Feedback type="invalid" id="password-feedback">
                                    Please enter a password.
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
                                    maxLength={255}
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
                                    maxLength={255}
                                />
                                <Form.Control.Feedback type="invalid" id="ln-feedback">
                                    Please enter your last name.
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
export default withRouter(connect(null, { createUser, signoutUser })(SignUp));

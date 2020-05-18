import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { signinUser, signoutUser } from '../actions';
import Error from './error';

// this can be dumb or smart component - connect works with either
class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validated: false,
        };
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        this.setState({ validated: false });
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const user = {
                username,
                password,
            };
            this.props.signinUser(user, this.props.history, this.props.editUser);
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
                    <div className="title">Sign In</div>
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
                                    placeholder="username"
                                />
                                <Form.Control.Feedback type="invalid" id="username-feedback">
                                    Please enter a Username.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="password"
                                    required
                                />
                                <Form.Control.Feedback type="invalid" id="password-feedback">
                                    Please enter a password.
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
export default withRouter(connect(null, { signinUser, signoutUser })(SignIn));
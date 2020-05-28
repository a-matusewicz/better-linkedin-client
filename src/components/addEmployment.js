/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addEmployment } from '../actions';
import Error from './error';

class addEmploy extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validated: false,
        };
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        const companyID = document.getElementById('company_id').value;
        const position = document.getElementById('position').value;
        const startDate = document.getElementById('start_date').value;
        const endDate = document.getElementById('end_date').value;
        const description = document.getElementById('description').value;
        this.setState({ validated: false });
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const employment = {
                companyID,
                position,
                startDate,
                endDate,
                description,
            };
            this.props.addEmployment(employment, this.props.history, this.props.addEmployment);
        }

        this.setState({ validated: true });
    }

    render() {
        const { validated } = this.state;
        if (this.props.user.auth) {
            return (
                <div className="new-content">
                    <Error />
                    <Button type="submit" variant="danger" onClick={this.handleSignOut}>Add Employment</Button>
                </div>
            );
        } else {
            return (
                <div className="new-content">
                    <Error />
                    <div className="title">Add Employment</div>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={(e) => this.handleSubmit(e)}
                    >
                        <Form.Row>
                            <Form.Group controlId="company_id">
                                <Form.Label>Company ID</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="######"
                                />
                                <Form.Control.Feedback type="invalid" id="username-feedback">
                                    Please enter a Company ID.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="position">
                                <Form.Label>Company Position</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="######"
                                />
                                <Form.Control.Feedback type="invalid" id="username-feedback">
                                    Please enter a Company Position.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="start_date">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="MM-DD-YYYY"
                                />
                                <Form.Control.Feedback type="invalid" id="username-feedback">
                                    Please enter a Start Date.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="end_date">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="MM-DD-YYYY"
                                />
                                <Form.Control.Feedback type="invalid" id="username-feedback">
                                    Please enter a End Date.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="description">
                                <Form.Label>Enter Description of Position</Form.Label>
                                <Form.Control as="textarea" rows="3" />
                            </Form.Group>
                        </Form.Row>
                    </Form>

                </div>
            );
        }
    }
}
export default withRouter(connect(null, { addEmployment })(addEmploy));

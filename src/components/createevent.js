import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { createEvent } from '../actions';
import Error from './error';

// Create a new event
class CreateEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validated: false,
        };
    }

    // Submits create for new event 
    handleSubmit = (event) => {
        const form = event.currentTarget;
        const eventName = document.getElementById('event_name').value;
        const eventTime = document.getElementById('event_time').value;
        const eventIndustry = document.getElementById('event_industry').value;
        const eventDesc = document.getElementById('event_desc').value;
        this.setState({ validated: false });
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const event = {
                eventName,
                eventTime,
                eventIndustry,
                eventDesc,
            };
            this.props.createEvent(event, this.props.history);
        }

        this.setState({ validated: true });
    }

    render() {
        const { validated } = this.state;
        return (
            <div className="new-content">
                <Error />
                <div className="title">Create new event:</div>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={(e) => this.handleSubmit(e)}
                >
                    <Form.Row>
                        <Form.Group controlId="event_name">
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Event Name"
                            />
                            <Form.Control.Feedback type="invalid" id="event-name-feedback">
                                Please enter an event name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="event_time">
                            <Form.Label>Event Time</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Time"
                                required
                            />
                            <Form.Control.Feedback type="invalid" id="event-time-feedback">
                                Please enter a time.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="event_industry">
                            <Form.Label>Industry</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Industry"
                                required
                            />
                            <Form.Control.Feedback type="invalid" id="event-industry-feedback">
                                Please enter an industry.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="event_desc">
                            <Form.Label>Event Time</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Description"
                                required
                            />
                            <Form.Control.Feedback type="invalid" id="event-desc-feedback">
                                Please enter a description.
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

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, { createEvent })(CreateEvent));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { createEvent, fetchIndustries } from '../actions';
import Error from './error';

// Create a new event
class CreateEvent extends Component {
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

    // Submits create for new event
    handleSubmit = (event) => {
        const form = event.currentTarget;
        const eventName = document.getElementById('event_name').value;
        const eventTime = document.getElementById('event_time').value;
        const eventDesc = document.getElementById('event_desc').value;
        this.setState({ validated: false });
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const newEvent = {
                eventName,
                eventTime,
                eventDesc,
                industryID: this.state.chosenID,
                userID: this.props.user.id,
            };
            this.props.createEvent(newEvent, this.props.history);
        }

        this.setState({ validated: true });
    }

    handleChange = () => {
        const newID = document.getElementById('event_industry').value;
        this.setState({ chosenID: newID });
    }

    // Retrieves events for current person
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
                                maxLength={255}
                            />
                            <Form.Control.Feedback type="invalid" id="event-name-feedback">
                                Please enter an event name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="event_time">
                            <Form.Label>Event Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="MM-DD-YYYY"
                                required
                            />
                            <Form.Control.Feedback type="invalid" id="event-time-feedback">
                                Please enter a date.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="event_industry">
                            <Form.Label>Industry</Form.Label>
                            <Form.Control as="select" value={this.state.chosenID} onChange={this.handleChange}>
                                {this.getIndustries()}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" id="event-industry-feedback">
                                Please enter an industry.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="event_desc">
                            <Form.Label>Event Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Description"
                                required
                                maxLength={255}
                            />
                            <Form.Control.Feedback type="invalid" id="event-desc-feedback">
                                Please enter a description.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <div className="buttons two-buttons">
                        <Button type="submit" variant="success">Submit</Button>
                        <Button onClick={() => this.props.history.push('/event')}>Back</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, { createEvent, fetchIndustries })(CreateEvent));

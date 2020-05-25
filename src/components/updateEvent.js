import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { updateEvent, fetchIndustries, fetchEvent} from '../actions';
import Error from './error';

// Update an event
class UpdateEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            validated: false,
            eventID,
        };
    }

    // get the eventID to edit
    componentDidMount = () => {
        this.props.fetchEvent( this.props.match.params.eventID);
    }

    // Submits an edit for an event
    handleSubmit = (event) => {
        const form = event.currentTarget;
        if(this.state.isEditing){
            this.props.updateEvent(
                Object.assign(
                    this,props.currentEvent,
                    {
                     eventName = document.getElementById('event_name').value,
                     eventTime = document.getElementById('event_time').value,
                     eventDesc = document.getElementById('event_desc').value  
                    }
                )
            );   
        }
        this.setState({ isEditing: !prevState.isEditing });
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const updatedEvent = {
                eventName: this.props.currentEvent.eventName,
                eventTime: this.props.currentEvent.eventTime,
                eventDesc: this.props.currentEvent.eventDesc,
                industryID: this.state.chosenID,
                userID: this.props.user.id,
            };
            this.props.updateEvent(updatedEvent);
        }
    }

    handleChange = () => {
        const newID = document.getElementById('event_industry').value;
        this.setState({ eventID: newID });
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
                <div className="title">Edit event information:</div>
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
                                placeholder={this.state.eventName}
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
                                placeholder={this.state.eventTime}
                                required
                            />
                            <Form.Control.Feedback type="invalid" id="event-time-feedback">
                                Please enter a time.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="event_industry">
                            <Form.Label>Industry</Form.Label>
                            <Form.Control as="select" value={this.state.eventID} onChange={this.handleChange}>
                                {this.getIndustries()}
                            </Form.Control>
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
                                placeholder={this.state.eventDesc}
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


const mapStateToProps = state => (
    {
      currentEvent: state.eventlist.current,
 }
);

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(mapStateToProps, { updateEvent, fetchIndustries, fetchEvent})(UpdateEvent));

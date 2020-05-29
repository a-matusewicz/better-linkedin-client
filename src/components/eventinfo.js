import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import {
    RSVP,
    unRSVP,
    deleteEvent,
    updateEvent,
} from '../actions';
import Error from './error';

// Displays list of events user is a part of
class EventInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            name: this.props.currentEvent.name,
            time: this.props.currentEvent.time,
            desc: this.props.currentEvent.desc,
            ind: this.props.currentEvent.ind,
        };
    }

    componentDidMount = () => {
        this.props.fetchEvent(this.props.location.eventData.id);
    }


    // Retrieves events for current person8
    handleIndustry = () => {
        if (this.props.location.eventData.ind !== 'null') {
            return (<div>{this.props.location.eventData.ind}</div>);
        } else {
            return (<div>No assigned industry</div>);
        }
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleButton = () => {
        // If participating, allow for un-RSVP; if organizer, allow for deleting
        if (this.props.location.eventData.participating === 1) {
            if (this.props.location.eventData.isorg === 1) {
                return (
                    <div>
                        <Button onClick={() => this.props.deleteEvent(this.props.location.eventData.id, this.props.history)}>Delete</Button>
                        <Button onClick={() => this.updateEvent(this.props.location.eventData)}>Edit</Button>
                    </div>
                );
            } else {
                return (<Button onClick={() => this.props.unRSVP(this.props.user.id, this.props.location.eventData.id, this.props.history)}>un-RSVP</Button>);
            }
        // Else, allow for RSVP
        } else {
            const RSVPRecord = {
                PersonID: this.props.user.id,
                EventID: this.props.location.eventData.id,
            };
            // eslint-disable-next-line new-cap
            return (<Button onClick={() => this.props.RSVP(RSVPRecord, this.props.history)}>RSVP</Button>);
        }
    }

    updateEvent = (id) => {
        const event = {
            name: this.state.name,
            time: this.state.time,
            desc: this.state.desc,
            ind: this.state.ind,
        };

        this.props.updateEvent(event);
        this.setState({
            isEditing: false,
        });
    }

      renderEvent = () => {
          if (this.state.isEditing) {
              return (
                  <div className="new-content">
                      <div className="title">Edit event</div>
                      <Form noValidate>
                          <Form.Row>
                              <Form.Group controlId="event_name">
                                  <Form.Label>Event Name</Form.Label>
                                  <Form.Control
                                      required
                                      type="text"
                                      placeholder="Event Name"
                                      maxLength={255}
                                  />
                                  <Form.Control.Feedback
                                      type="invalid"
                                      id="event-name-feedback"
                                      value={this.state.name}
                                      onChange={this.handleChange('name')}
                                  />
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
                                  <Form.Control.Feedback
                                      type="invalid"
                                      id="event-time-feedback"
                                      value={this.state.time}
                                      onChange={this.handleChange('time')}
                                  />
                              </Form.Group>
                              <Form.Group as={Col} controlId="event_industry">
                                  <Form.Label>Industry</Form.Label>
                                  <Form.Control as="select" value={this.state.chosenID} onChange={this.handleChange}>
                                      {this.getIndustries()}
                                  </Form.Control>
                                  <Form.Control.Feedback
                                      type="invalid"
                                      id="event-industry-feedback"
                                      value={this.state.ind}
                                      onChange={this.handleChange('ind')}
                                  />
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
                                  <Form.Control.Feedback
                                      type="invalid"
                                      id="event-desc-feedback"
                                      value={this.state.desc}
                                      onChange={this.handleChange('desc')}
                                  />
                              </Form.Group>
                          </Form.Row>
                          <div className="buttons">
                              <Button type="submit" variant="success">Update</Button>
                              <Button onClick={() => { this.updateEvent(this.props.location.eventData.id); }}>Update</Button>
                              <Button onClick={() => { this.setState({ isEditing: false }); }}>Cancel</Button>
                          </div>
                      </Form>
                  </div>

              );
          } else {
              const { currentEvent } = this.props;

              return (
                  <div className="new-content">
                      <Error />
                      <div>
                          {this.props.location.eventData.name}
                      </div>
                      <div>
                          {(new Date(this.props.location.eventData.time)).toLocaleDateString()}
                      </div>
                      <div>
                          {this.handleIndustry()}
                      </div>
                      <div>
                          Organizer email: {this.props.location.eventData.orgemail}
                      </div>
                      <div>
                          {this.props.location.eventData.desc}
                      </div>
                      {this.handleButton()}
                      <Button onClick={() => {
                          this.setState({
                              isEditing: true,
                              name: currentEvent.name,
                              time: currentEvent.time,
                              desc: currentEvent.desc,
                              ind: currentEvent.ind,
                          });
                      }}
                      >Edit
                      </Button>
                      <Button onClick={() => this.props.history.push(this.props.location.eventData.originpath)}>Back</Button>
                  </div>
              );
          }
      }

      render() {
          return (
              <div className="event">
                  {this.renderEvent()}
              </div>
          );
      }
}

const mapStateToProps = (state) => (
    {
        currentEvent: state.eventlist.current,
    }
);

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(mapStateToProps, {
    RSVP,
    unRSVP,
    deleteEvent,
    updateEvent,
})(EventInfo));

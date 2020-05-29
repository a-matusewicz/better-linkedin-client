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
    fetchIndustries,
} from '../actions';
import Error from './error';

// Displays list of events user is a part of
class EventInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            name: this.props.location.eventData.name,
            time: this.props.location.eventData.time,
            desc: this.props.location.eventData.desc,
            ind: this.props.location.eventData.ind,
            industryList: [],
        };
    }


    componentDidMount() {
        // Get list of industries
        this.props.fetchIndustries((industryList) => { this.setState({ industryList }); });
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

    updateEvent = () => {
        const event = {
            name: this.state.name,
            time: this.state.time,
            desc: this.state.desc,
            ind: this.state.ind,
            user: this.props.user.id,
        };

        this.props.updateEvent(this.props.location.eventData.id, event);
        this.setState({
            isEditing: false,
        });
    }

    // Retrieves events for current person8
    getIndustries = () => {
        return (
            this.state.industryList.map((item) => {
                return (
                    <option selected={item.IndustryID === this.state.ind} key={item.IndustryID} value={this.state.ind}>{item.IndustryName}</option>
                );
            })
        );
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
                                      value={this.state.name}
                                      maxLength={255}
                                      onChange={this.handleChange('name')}
                                  />
                              </Form.Group>
                          </Form.Row>
                          <Form.Row>
                              <Form.Group as={Col} controlId="event_time">
                                  <Form.Label>Event Time</Form.Label>
                                  <Form.Control
                                      type="text"
                                      required
                                      value={this.state.time}
                                      onChange={this.handleChange('time')}
                                  />
                              </Form.Group>
                              <Form.Group as={Col} controlId="event_industry">
                                  <Form.Label>Industry</Form.Label>
                                  <Form.Control as="select" value={this.state.ind} onChange={this.handleChange('ind')}>
                                      {this.getIndustries()}
                                  </Form.Control>
                              </Form.Group>
                          </Form.Row>
                          <Form.Row>
                              <Form.Group controlId="event_desc">
                                  <Form.Label>Event Description</Form.Label>
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
                                  this.updateEvent(
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
              return (
                  <div className="new-content">
                      <Error />
                      <div>
                          {this.state.name}
                      </div>
                      <div>
                          {(new Date(this.state.time)).toLocaleDateString()}
                      </div>
                      <div>
                          {this.handleIndustry()}
                      </div>
                      <div>
                          Organizer email: {this.props.location.eventData.orgemail}
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

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, {
    RSVP,
    unRSVP,
    deleteEvent,
    updateEvent,
    fetchIndustries,
})(EventInfo));

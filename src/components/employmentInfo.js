import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { deleteEmployment, updateEmp } from '../actions';
import Error from './error';

class EmploymentInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            CompanyName: this.props.location.employmentData.CompanyName,
            StartDate: this.props.location.employmentData.StartDate,
            EndDate: this.props.location.employmentData.EndDate,
            Desc: this.props.location.employmentData.Desc,
        };
    }

    handleButton = () => {
        const delEmployment = {
            PersonID: this.props.user.id,
            CompanyID: this.props.location.employmentData.CompanyID,
        };

        return (<Button onClick={() => this.props.deleteEmployment(delEmployment, this.props.history)}>Delete</Button>);
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    updateEmp = () => {
        const event = {
            CompanyName: this.state.CompanyName,
            StartDate: this.state.StartDate,
            EndDate: this.state.EndDate,
            Desc: this.state.Desc,

        };

        this.props.updateEmp(this.props.location.employmentData.id, event);
        this.setState({
            isEditing: false,
        });
    }

    renderEmp = () => {
        if (this.state.isEditing) {
            return (
                <div className="new-content">
                    <div className="title">Edit employment</div>
                    <Form noValidate>
                        <Form.Row>
                            <Form.Group controlId="CompanyName">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={this.state.CompanyName}
                                    maxLength={255}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="StartDate">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    value={this.state.StartDate}
                                    onChange={this.handleChange('StartDate')}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="EndDate">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    maxLength={255}
                                    value={this.state.EndDate}
                                    onChange={this.handleChange('EndDate')}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="Desc">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    maxLength={255}
                                    value={this.state.Desc}
                                    onChange={this.handleChange('Desc')}
                                />
                            </Form.Group>
                        </Form.Row>

                        <div className="buttons">
                            <Button onClick={() => {
                                this.updateEmp(
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
                        {this.state.CompanyName}
                    </div>
                    <div>
                        {(new Date(this.state.StartDate)).toLocaleDateString()}
                    </div>
                    <div>
                        {(new Date(this.state.EndDate)).toLocaleDateString()}
                    </div>
                    <div>
                        {this.state.Desc}
                    </div>
                    {this.handleButton()}
                    <Button onClick={() => {
                        this.setState({
                            isEditing: true,
                        });
                    }}
                    >Edit
                    </Button>
                    <Button onClick={() => this.props.history.push(this.props.location.employmentData.originpath)}>Back</Button>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="employment">
                {this.renderEmp()}
            </div>
        );
    }
}
export default withRouter(connect(null, { deleteEmployment, updateEmp })(EmploymentInfo));

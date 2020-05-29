import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { addEmployment, fetchCompanies } from '../actions';
import Error from './error';

class addEmploy extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validated: false,
            companyList: [],
            chosenID: 2,
        };
    }

    componentDidMount() {
        // Get list of industries
        this.props.fetchCompanies((companyList) => { this.setState({ companyList }); });
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        const companyPosition = document.getElementById('position').value;
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
                companyID: this.state.chosenID,
                companyPosition,
                startDate,
                endDate,
                description,
                personID: this.props.user.id,
            };
            this.props.addEmployment(employment, this.props.history);
        }

        this.setState({ validated: true });
    }

    handleChange = () => {
        const newID = document.getElementById('company_ID').value;
        this.setState({ chosenID: newID });
    }

    // Retrieves groups for current person8
    getCompanies = () => {
        return (
            this.state.companyList.map((item) => {
                return (
                    <option key={item.CompanyID} value={item.CompanyID}>{item.CompanyName}</option>
                );
            })
        );
    }

    render() {
        const { validated } = this.state;
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
                        <Form.Group as={Col} controlId="company_ID">
                            <Form.Label>Company</Form.Label>
                            <Form.Control as="select" value={this.state.chosenID} onChange={this.handleChange}>
                                {this.getCompanies()}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" id="company">
                                Please enter a Company.
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
                    <div className="buttons">
                        <Button type="submit" variant="success">Submit</Button>
                    </div>
                </Form>
                <Button onClick={() => this.props.history.push('/employment')}>Back</Button>
            </div>
        );
    }
}
export default withRouter(connect(null, { addEmployment, fetchCompanies })(addEmploy));

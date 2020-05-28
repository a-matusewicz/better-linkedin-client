import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { createCompany, fetchIndustries } from '../actions';
import Error from './error';

// Create a new company
class CreateCompany extends Component {
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

    // Submits create for new company
    handleSubmit = (event) => {
        const form = event.currentTarget;
        const companyName = document.getElementById('company_name').value;
        const companyDescription = document.getElementById('company_desc').value;
        this.setState({ validated: false });
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const newCompany = {
                companyName,
                companyDescription,
                industryID: this.state.chosenID,
                personID: this.props.user.id,
            };
            this.props.createCompany(newCompany, this.props.history);
        }

        this.setState({ validated: true });
    }

    handleChange = () => {
        const newID = document.getElementById('company_industry').value;
        this.setState({ chosenID: newID });
    }

    // Retrieves companies for current person8
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
                <div className="title">Create new company:</div>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={(e) => this.handleSubmit(e)}
                >
                    <Form.Row>
                        <Form.Group controlId="company_name">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Company Name"
                                maxLength={255}
                            />
                            <Form.Control.Feedback type="invalid" id="company-name-feedback">
                                Please enter an company name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="company_industry">
                            <Form.Label>Industry</Form.Label>
                            <Form.Control as="select" value={this.state.chosenID} onChange={this.handleChange}>
                                {this.getIndustries()}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" id="company-industry-feedback">
                                Please enter an industry.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="company_desc">
                            <Form.Label>Company Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Description"
                                required
                                maxLength={255}
                            />
                            <Form.Control.Feedback type="invalid" id="company-desc-feedback">
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
export default withRouter(connect(null, { createCompany, fetchIndustries })(CreateCompany));

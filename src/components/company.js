/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Error from './error';
import {
    fetchCompany, deleteCompany, fetchEmployees, deleteEmployment,
} from '../actions';

class Company extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: {},
            employees: [],
            isAdmin: false,
        };
    }

    componentDidMount() {
        this.props.fetchCompany(this.props.companyID, (company) => this.setState({ company }));
        this.props.fetchEmployees(this.props.companyID, (employees) => {
            this.setState({ employees });
            const user = employees.filter((e) => e.PersonID === this.props.user.id);
            this.setState({ isAdmin: user[0] && user[0].Admin === 1 });
        });
    }

    renderTrash = (employee) => {
        if (this.state.isAdmin) {
            return (
                <td>
                    <Button disabled={employee.PersonID === this.props.user.id} variant="secondary" onClick={() => {}}>
                        <i className="fa fa-trash" />
                    </Button>
                </td>
            );
        } else {
            return (
                <td />
            );
        }
    }

    renderEmployees = () => {
        if (this.state.employees.length > 0) {
            return (
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Start Date</th>
                            {this.state.isAdmin ? <th>Remove Employee</th> : <th aria-label="Not admin" />}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((employee) => {
                            return (
                                <tr key={employee.PersonID}>
                                    <td>{employee.FirstName}</td>
                                    <td>{employee.LastName}</td>
                                    <td>{employee.Email}</td>
                                    <td>{(new Date(employee.StartDate)).toLocaleString()}</td>
                                    {this.renderTrash(employee)}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            );
        } else {
            return 'No employees found.';
        }
    }

    handleDelete = () => {
        this.props.deleteCompany(this.props.companyID, this.props.user.id, this.props.history);
    }

    renderDelete = () => {
        if (this.state.isAdmin) {
            return <Button variant="danger" onClick={this.handleDelete}>Delete Company</Button>;
        } else {
            return <div />;
        }
    }

    render() {
        if (!this.state.company) {
            return <div className="new-content">Company not found.</div>;
        }

        return (
            <div className="new-content">
                <Error />
                <div className="company-name">
                    {this.state.company.CompanyName}
                </div>
                <div className="company-industry">
                    {this.state.company.IndustryName}
                </div>
                <div className="company-description">
                    {this.state.company.CompanyDescription}
                </div>
                <div className="header">Employees</div>
                {this.renderEmployees()}
                {this.renderDelete()}
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, {
    fetchCompany, deleteCompany, fetchEmployees, deleteEmployment,
})(Company));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { fetchCompanies } from '../actions';
import Error from './error';

// Displays list of companies
class CompanyList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companyList: [],
        };
    }

    componentDidMount() {
        // Get list of companies for current user
        this.props.fetchCompanies((companyList) => this.setState({ companyList }));
    }

    // Retrieves events for current person8
    renderCompaniesList = () => {
        return (
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Description</th>
                        <th>Industry</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.companyList.map((item) => {
                        return (
                            <tr key={item.CompanyID}>
                                <td>
                                    <NavLink exact to={`company/${item.CompanyID}`} className="company-name-list">
                                        {item.CompanyName}
                                    </NavLink>
                                </td>
                                <td>{item.CompanyDescription}</td>
                                <td>{item.IndustryName}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }

    render() {
        return (
            <div className="new-content">
                <Error />
                <NavLink to="company/new" className="add"><Button variant="success">Add New</Button></NavLink>
                {this.renderCompaniesList()}
            </div>
        );
    }
}

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(null, { fetchCompanies })(CompanyList));

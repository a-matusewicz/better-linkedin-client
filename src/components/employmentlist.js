import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { fetchEmployment } from '../actions';
import Error from './error';


class EmploymentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employmentList: [],
        };
    }

    componentDidMount() {
        // Get list of events for current user
        this.props.fetchEmployment(this.props.user.id, (employmentList) => { this.setState({ employmentList }); });
    }

    // Retrieves events for current person8
    getEmploymentList = () => {
        return (
            <ul>
                {this.state.employmentList.map((item) => {
                    return (
                        <li key={item.PersonID}>
                            {/* eslint-disable-next-line max-len */}
                            <NavLink to={`/employment/${item.PersonID},${item.CompanyID},${item.StartDate},${item.EndDate},${item.EmploymentDescription}`} exact>
                                {item.CompanyID}, {(new Date(item.StartDate)).toLocaleDateString()}, {(new Date(item.EndDate)).toLocaleDateString()}, {item.EmploymentDescription}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        );
    }

    render() {
        return (
            <div className="new-content">
                <Error />
                Your Employment History:
                <div>
                    {this.getEmploymentList()}
                </div>
                <Button onClick={() => this.props.history.push('/event')}>Back</Button>
            </div>
        );
    }
}

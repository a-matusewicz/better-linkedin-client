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
        this.props.fetchEmployment(this.props.user.id, (employmentList) => { this.setState({ employmentList }); });
    }

    getEmploymentList = () => {
        return (
            <ul>
                {this.state.employmentList.map((item) => {
                    return (
                        <li key={item.CompanyID}>
                            {/* eslint-disable-next-line max-len */}
                            <NavLink exact
                                to={{
                                    pathname: '/employmentinfo/',
                                    employmentData: {
                                        PersonID: item.PersonID,
                                        CompanyID: item.CompanyID,
                                        StartDate: item.StartDate,
                                        CompanyName: item.CompanyName,
                                        EndDate: item.EndDate,
                                        Desc: item.EmploymentDescription,
                                        originpath: '/listemployment',
                                    },
                                }}
                            >
                                {/* eslint-disable-next-line max-len */}
                                {item.CompanyName}, {(new Date(item.StartDate)).toLocaleDateString()}, {(new Date(item.EndDate)).toLocaleDateString()}, {item.EmploymentDescription}
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
                <Button onClick={() => this.props.history.push('/employment')}>Back</Button>
            </div>
        );
    }
}
export default withRouter(connect(null, { fetchEmployment })(EmploymentList));

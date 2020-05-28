import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { deleteEmployment } from '../actions';
import Error from './error';

class EmploymentInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleButton = () => {
        const delEmployment = {
            PersonID: this.props.user.id,
            CompanyID: this.props.location.employmentData.CompanyID,
        };

        return (<Button onClick={() => this.props.deleteEmployment(delEmployment, this.props.history)}>Delete</Button>);
    }

    render() {
        return (
            <div className="new-content">
                <Error />
                <div>
                    {this.props.location.employmentData.CompanyName}
                </div>
                <div>
                    {this.props.location.employmentData.StartDate}
                </div>
                <div>
                    {this.props.location.employmentData.EndDate}
                </div>
                <div>
                    {this.props.location.employmentData.Desc}
                </div>
                {this.handleButton()}
            </div>
        );
    }
}
export default withRouter(connect(null, { deleteEmployment })(EmploymentInfo));

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
            PersonID: this.props.user.PersonId,
            CompanyID: this.props.match.params.CompanyId,
            Desc: this.props.match.params.Desc,
        };
            // eslint-disable-next-line new-cap
        return (<Button onClick={() => this.props.deleteEmployment(delEmployment, this.props.history)}>Delete</Button>);
    }

    render() {
        return (
            <div className="new-content">
                <Error />
                <div>
                    {this.props.match.params.CompanyId}
                </div>
                <div>
                    {this.props.match.params.StartDate}
                </div>
                <div>
                    {this.props.match.params.EndDate}
                </div>
                <div>
                    {this.props.match.params.Desc}
                </div>
                {this.handleButton()}
            </div>
        );
    }
}
export default withRouter(connect(null, { deleteEmployment })(EmploymentInfo));

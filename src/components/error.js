import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { clearError } from '../actions';

// this can be dumb or smart component - connect works with either
class Error extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true,
        };
    }

    error = () => {
        if (this.props.error.error) {
            const handleHide = () => {
                this.props.clearError();
                this.setState({ show: false });
            };

            let { text } = this.props.error;
            if (text && text.error) {
                text = this.props.error.text.error.message;
            }
            return (
                <Alert show={this.state.show} variant="danger" dismissible onClick={handleHide}>
                    <Alert.Heading>
                        Oh snap! You got a
                        {' '}
                        {this.props.error.status}
                        {' '}
                        error!
                    </Alert.Heading>
                    <p>
                        {text}
                    </p>
                </Alert>
            );
        } else {
            return <div />;
        }
    };


    render() {
        return this.error();
    }
}

// connects particular parts of redux state to this components props
const mapStateToProps = (state) => (
    {
        error: state.error,
    }
);

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(mapStateToProps, { clearError })(Error));

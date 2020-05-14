/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import '../style.scss';
import axios from 'axios';
import {
    BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import PrivateRoute from '../containers/requireAuth';
import SignIn from './signin';
import SignUp from './signup';
import { ROOT_URL } from '../actions/index';

const About = (props) => {
    return <div> All there is to know about me </div>;
};
const Welcome = (props) => {
    return (
        <div>
            Welcome, {props.user.username}!
        </div>
    );
};
const FallBack = (props) => {
    return <div>URL Not Found</div>;
};

const Nav = (props) => {
    return (
        <nav>
            <ul className="nav-bar">
                <li><NavLink to="/" exact>Home</NavLink></li>
                <li><NavLink to="/signin">Sign In</NavLink></li>
                <li><NavLink to="/signup">Sign Up</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
            </ul>
        </nav>
    );
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: { auth: false },
        };
    }

    componentDidMount() {
        const accesString = localStorage.getItem('JWT');
        if (accesString) {
            axios.get(`${ROOT_URL}/users/findUser`, {
                headers: { Authorization: `JWT ${accesString}` },
            }).catch((error) => {
                console.log(error);
            }).then((response) => {
                console.log(response);
                this.setState({ user: response.data });
            });
        }
    }

    editUser = (user) => {
        this.setState({ user });
    }

    render() {
        return (
            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <PrivateRoute exact path="/" user={this.state.user} component={(props) => <Welcome {...props} user={this.state.user} />} />
                        <Route path="/signin" component={(props) => <SignIn user={this.state.user} editUser={this.editUser} />} />
                        <Route path="/signup" component={(props) => <SignUp user={this.state.user} editUser={this.editUser} />} />
                        <Route path="/about" component={About} />
                        <Route component={FallBack} />
                    </Switch>
                </div>
            </Router>
        );
    }
}


export default App;

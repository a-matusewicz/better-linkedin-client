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
import Event from './event';
import EventList from './eventlist';
import CreateEvent from './createevent';
import JoinEvent from './joinevent';
import EventInfo from './eventinfo';
import EmploymentInfo from './employmentinfo';
import AddEmployment from './addEmployment';
import EmploymentList from './employmentlist';
import Employment from './employment';
import { ROOT_URL } from '../actions/index';

const About = (props) => {
    return <div> All there is to know about me </div>;
};
const Welcome = (props) => {
    return (
        <div>
            Welcome, {props.user.email}!
            <ul>
                <li><NavLink to="/event" exact>Events</NavLink></li>
                <li><NavLink to="/employment" exact>Employment</NavLink></li>
            </ul>
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
                        <Route path="/event" component={(props) => <Event user={this.state.user} />} />
                        <Route path="/eventlist" component={(props) => <EventList user={this.state.user} />} />
                        <Route path="/createevent" component={(props) => <CreateEvent user={this.state.user} />} />
                        <Route path="/joinevent" component={(props) => <JoinEvent user={this.state.user} />} />
                        <Route path="/addemployment" component={(props) => <AddEmployment user={this.state.user} />} />
                        <Route path="/employment" component={(props) => <Employment user={this.state.user} />} />
                        <Route path="/listemployment" component={(props) => <EmploymentList user={this.state.user} />} />
                        <Route path="/employmentinfo" component={(props) => <EmploymentInfo user={this.state.user} />} />
                        <Route path="/eventinfo/:id,:name,:time,:desc,:ind,:participating" component={(props) => <EventInfo user={this.state.user} />} />
                        <Route component={FallBack} />
                    </Switch>
                </div>
            </Router>
        );
    }
}


export default App;

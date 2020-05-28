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
import Group from './group';
import GroupList from './grouplist';
import CreateGroup from './creategroup';
import JoinGroup from './joingroup';
import GroupInfo from './groupinfo';
import { ROOT_URL } from '../actions/index';
import CustomNav from './navbar';

const About = (props) => {
    return <div> All there is to know about me </div>;
};
const Welcome = (props) => {
    return (
        <div>
            Welcome, {props.user.email}!
            <ul>
                <li><NavLink to="/event" exact>Events</NavLink></li>
                <li><NavLink to="/group" exact>Groups</NavLink></li>
            </ul>
        </div>
    );
};
const FallBack = (props) => {
    return <div>URL Not Found</div>;
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
                    <CustomNav user={this.state.user} editUser={this.editUser} />
                    <Switch>
                        <PrivateRoute exact path="/" user={this.state.user} component={(props) => <Welcome {...props} user={this.state.user} />} />
                        <Route path="/signin" component={(props) => <SignIn user={this.state.user} editUser={this.editUser} />} />
                        <Route path="/signup" component={(props) => <SignUp user={this.state.user} editUser={this.editUser} />} />
                        <Route path="/about" component={About} />
                        <Route path="/event" component={(props) => <Event user={this.state.user} />} />
                        <Route path="/eventlist" component={(props) => <EventList user={this.state.user} />} />
                        <Route path="/createevent" component={(props) => <CreateEvent user={this.state.user} />} />
                        <Route path="/joinevent" component={(props) => <JoinEvent user={this.state.user} />} />
                        <Route path="/eventinfo" component={(props) => <EventInfo user={this.state.user} />} />
                        <Route path="/group" component={(props) => <Group user={this.state.user} />} />
                        <Route path="/grouplist" component={(props) => <GroupList user={this.state.user} />} />
                        <Route path="/creategroup" component={(props) => <CreateGroup user={this.state.user} />} />
                        <Route path="/joingroup" component={(props) => <JoinGroup user={this.state.user} />} />
                        <Route path="/groupinfo" component={(props) => <GroupInfo user={this.state.user} />} />
                        <Route component={FallBack} />
                    </Switch>
                </div>
            </Router>
        );
    }
}


export default App;

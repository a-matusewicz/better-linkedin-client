import axios from 'axios';

export const ROOT_URL = 'http://localhost:3000/api';

// keys for actiontypes
export const ActionTypes = {
    AUTH_ERROR: 'AUTH_ERROR',
    THROW_ERROR: 'THROW_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
};

export function throwError(error) {
    return {
        type: ActionTypes.THROW_ERROR,
        payload: error,
    };
}

export function clearError() {
    return (dispatch) => {
        dispatch({ type: ActionTypes.CLEAR_ERROR, payload: '' });
    };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
    return {
        type: ActionTypes.AUTH_ERROR,
        payload: error,
    };
}

export function signinUser({ email, password }, history, callback) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/users/loginUser`, { params: { email, password } })
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                if (response.data && response.data.auth) {
                    localStorage.setItem('JWT', response.data.token);

                    if (callback) {
                        callback({
                            auth: response.data.auth,
                            email,
                            id: response.data.id,
                        });
                    }
                    history.push('/');
                }
            });
    };
}

// Creates new user
export function createUser(user, history, callback) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/users/registerUser`, user)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                if (response.data && response.data.auth) {
                    localStorage.setItem('JWT', response.data.token);

                    if (callback) {
                        callback({
                            auth: response.data.auth,
                            email: user.email,
                            id: response.data.id,
                        });
                    }
                    history.push('/');
                }
                return response.data;
            });
    };
}


// deletes token from localstorage
// and deauths
export function signoutUser(history, callback) {
    return () => {
        localStorage.removeItem('JWT');
        callback({ user: { auth: false } });
        history.push('/signin');
    };
}

// Gets information on current user
export function fetchUser(token, callback) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/users/findUser`, {
            headers: { Authorization: `JWT ${token}` },
        }).catch((error) => {
            return dispatch(authError(error.response));
        }).then((response) => {
            if (response.data && response.data.auth) {
                if (callback) {
                    callback({
                        auth: response.data.auth,
                        email: response.data.email,
                    });
                }
            }
        });
    };
}

// Gets list of companies
export function fetchCompanies(callback) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/companies/getCompanies`)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                if (callback && response.data.data) {
                    callback(response.data.data);
                }
            });
    };
}

// Gets company by ID
export function fetchCompany(companyID, callback) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/companies/${companyID}`)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                if (callback && response.data.data) {
                    callback(response.data.data[0]);
                }
            });
    };
}

// Post new company then return to companies page
export function createCompany(company, history) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/companies/addCompany`, company)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                history.push('/company');
                return response.data;
            });
    };
}

// Deletes company
export function deleteCompany(companyID, personID, history) {
    return (dispatch) => {
        axios.delete(`${ROOT_URL}/companies/${companyID}/${personID}`)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    history.push('/company');
                }
                return response.data;
            });
    };
}

// Gets company by ID
export function fetchEmployees(companyID, callback) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/employment/${companyID}`)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                if (callback && response.data.data) {
                    callback(response.data.data);
                }
            });
    };
}

// Post new event then return to events page
export function createEvent(event, history) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/events/createEvent`, event)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                history.push('/event');
                return response.data;
            });
    };
}

// Gets list of events for current user
export function fetchUserEvents(personId, callback) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/users/getEvents/${personId}`)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                if (callback && response.data.data) {
                    callback(response.data.data);
                }
            });
    };
}

// Gets list of all events
export function fetchEvents(callback) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/events/getEvents`)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                if (callback && response.data.data) {
                    callback(response.data.data);
                }
            });
    };
}

// Un-RSVP user from an event
export function unRSVP(personID, eventID, history) {
    return (dispatch) => {
        axios.delete(`${ROOT_URL}/events/${personID}/${eventID}`)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                history.push('/event');
                return response.data;
            });
    };
}

// RSVP user to an event
export function RSVP(RSVPRecord, history) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/events/RSVP`, RSVPRecord)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                history.push('/event');
                return response.data;
            });
    };
}

// Gets list of all industries
export function fetchIndustries(callback) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/industries/getIndustries`)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                if (callback && response.data.data) {
                    callback(response.data.data);
                }
            });
    };
}

// Delete event then return to events page
export function deleteEvent(eventID, history) {
    return (dispatch) => {
        axios.delete(`${ROOT_URL}/events/${eventID}`)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                history.push('/event');
                return response.data;
            });
    };
}

// Post new group then return to groups page
export function createGroup(group, history) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/groups/createGroup`, group)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                history.push('/group');
                return response.data;
            });
    };
}

// Gets list of groups for current user
export function fetchUserGroups(personId, callback) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/users/getGroups/${personId}`)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                if (callback && response.data.data) {
                    callback(response.data.data);
                }
            });
    };
}

// Gets list of all groups
export function fetchGroups(callback) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/groups/getGroups`)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                if (callback && response.data.data) {
                    callback(response.data.data);
                }
            });
    };
}

// Leave group for given user and return to groups page
export function leaveGroup(personID, groupID, history) {
    return (dispatch) => {
        axios.delete(`${ROOT_URL}/groups/${personID}/${groupID}`)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                history.push('/group');
                return response.data;
            });
    };
}

// Join group for given user and return to groups page
export function joinGroup(MemberRecord, history) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/groups/joinGroup`, MemberRecord)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                history.push('/group');
                return response.data;
            });
    };
}

// Delete group then return to groups page
export function deleteGroup(groupID, history) {
    return (dispatch) => {
        axios.delete(`${ROOT_URL}/groups/${groupID}`)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                history.push('/group');
                return response.data;
            });
    };
}

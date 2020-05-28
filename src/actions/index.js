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

// Un-RSVP user from an event
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

// Add employment history
export function addEmployment(employment, history) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/employment/add`, employment)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                history.push('/employment');
                return response.data;
            });
    };
}

// Gets list of all Employment for a person
export function fetchEmployment(personID, callback) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/users/getEmployment/${personID}`)
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
export function deleteEmployment(delEmployment, history) {
    return (dispatch) => {
        axios.delete(`${ROOT_URL}/deleteEmployment`, delEmployment)
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                history.push('/event');
                console.log(response.data);
                return response.data;
            });
    };
}

// Gets list of all industries
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

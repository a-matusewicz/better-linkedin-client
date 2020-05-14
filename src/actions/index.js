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

export function signinUser({ username, password }, history, callback) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/users/loginUser`, { params: { username, password } })
            .catch((error) => {
                return dispatch(authError(error.response));
            }).then((response) => {
                if (response.data && response.data.auth) {
                    localStorage.setItem('JWT', response.data.token);

                    if (callback) {
                        callback({
                            auth: response.data.auth,
                            username,
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
                            username: user.username,
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
                        username: response.data.username,
                    });
                }
            }
        });
    };
}

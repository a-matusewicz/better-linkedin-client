import { ActionTypes } from '../actions';

// Adapted from https://redux.js.org/basics/reducers
const initialState = {
    error: false,
    status: 200,
    text: '',
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.THROW_ERROR:
        if (!action.payload) {
            return {
                error: true,
                status: 404,
                text: 'Database connection error or not found',
            };
        } else {
            return {
                error: true,
                status: action.payload.status,
                text: action.payload.data,
            };
        }
    case ActionTypes.CLEAR_ERROR:
        return {
            error: false,
            status: 200,
            text: '',
        };
    case ActionTypes.AUTH_ERROR:
        return {
            error: true,
            status: action.payload.status,
            text: action.payload.data,
        };
    default:
        return state;
    }
};

export default AuthReducer;

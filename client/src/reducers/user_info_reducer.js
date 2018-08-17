import {SAVE_USER_DETAILS} from '../actions/index';

const INITIAL_STATE = {
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null
};


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SAVE_USER_DETAILS:
            return {...state, ...action.payload};
        default:
            return state;
    }
}
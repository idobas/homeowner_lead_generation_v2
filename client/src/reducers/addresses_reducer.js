import {ADDRESS_CHANGED, GET_ZESTIMATE} from '../actions/index';

const INITIAL_STATE = {
    address: '',
    isInMaps: false,
    zestimate: 0,
    history: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADDRESS_CHANGED:
            return {...state, ...action.payload};
        case GET_ZESTIMATE:
            const history = [...state.history, state.address];
            return {...state, zestimate: action.payload, history};
        default:
            return state;
    }
}
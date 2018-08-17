import {ADDRESS_CHANGED, GET_ZESTIMATE} from '../actions/index';

const INITIAL_STATE = {
    address: '',
    isInMap: false,
    zestimate: 0,
    history: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADDRESS_CHANGED:
            if (action.payload.isInMaps) {
                const history = [...state.history, action.payload.address];
                console.log(history);
                return {...state, ...action.payload, history};
            }
            return {...state, ...action.payload};
        case GET_ZESTIMATE:
            return {...state, zestimate: action.payload};
        default:
            return state;
    }
}
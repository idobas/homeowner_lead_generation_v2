import { CHANGE_PROGRESS_BAR_PROGRESS } from '../actions/index';

const INITIAL_STATE = {
    progress: 0
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CHANGE_PROGRESS_BAR_PROGRESS:
            return {...state, ...action.payload}
        default:
            return state;
    }
}
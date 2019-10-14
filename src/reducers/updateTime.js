import {
    SET_UPDATE_TIME_START,
    SET_UPDATE_TIME_COMPLETE
} from '../constants';

export default function updateTime(state = {}, action) {
    switch (action.type) {
        case SET_UPDATE_TIME_START:
            return {
                ...state,
                blockNumber: action.payload.blockNumber,
                loading: action.payload.status
            };

        case SET_UPDATE_TIME_COMPLETE:
            return {
                ...state,
                blockNumber: action.payload.blockNumber,
                loading: action.payload.status
            };

        default:
            return state;
    }
}
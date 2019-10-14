import {
    GET_CANCELLATION_DETAILS_START,
    GET_CANCELLATION_DETAILS_SUCCESS,
    GET_CANCELLATION_DETAILS_ERROR
} from '../constants';

export default function cancellationPolicies(state = {}, action){
    switch(action.type){
        
        case GET_CANCELLATION_DETAILS_SUCCESS:
        return {
            ...state,
            cancellationPolicies: action.payload.cancellationPolicies
        }

        default:
        return state;
    }
}
import {
    GET_PAYOUT_DETAILS_START,
    GET_PAYOUT_DETAILS_SUCCESS,
    GET_PAYOUT_DETAILS_ERROR
} from '../constants';

export default function payout(state = {}, action){
    switch(action.type){
        
        case GET_PAYOUT_DETAILS_SUCCESS:
        return {
            ...state,
            payoutDetails: action.payload.payout
        }

        default:
        return state;
    }
}
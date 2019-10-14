import { SET_LISTING_ADDRESS_VALUES } from '../constants';

export default function listingAddress(state = {}, action) {
    switch (action.type) {
        case SET_LISTING_ADDRESS_VALUES:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        default:
            return state;
    }
}

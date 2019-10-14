/* eslint-disable import/prefer-default-export */

import { SET_LISTING_ADDRESS_VALUES } from '../../constants';

export function setListingAddressValues({ name, value }) {
    return {
        type: SET_LISTING_ADDRESS_VALUES,
        payload: {
            name,
            value,
        },
    };
}

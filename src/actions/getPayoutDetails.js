import { gql } from 'react-apollo';
import moment from 'moment';

import {
    GET_PAYOUT_DETAILS_START,
    GET_PAYOUT_DETAILS_SUCCESS,
    GET_PAYOUT_DETAILS_ERROR
} from '../constants';

const query = gql`
query getPayouts {
    getPayouts {
      id
      methodId
      paymentMethod{
        id
        name
      }
      userId
      payEmail
      address1
      address2
      city
      state
      country
      zipcode
      currency
      default
      createdAt
      status
    }
  }
`;

export function getPayoutDetails() {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: GET_PAYOUT_DETAILS_START,
        });

        try {
            // Send Request to get listing data
            const { data } = await client.query({
                query,
                fetchPolicy: 'network-only',
            });

            if (data && data.getPayouts) {
                dispatch({
                    type: GET_PAYOUT_DETAILS_SUCCESS,
                    payload: {
                        payout: data.getPayouts
                    }
                });
            } else {
                dispatch({
                    type: GET_PAYOUT_DETAILS_ERROR,
                });
            }
        } catch (error) {
            dispatch({
                type: GET_PAYOUT_DETAILS_ERROR,
                payload: {
                    error,
                },
            });
            return false;
        }

        return true;
    };
}

import { gql } from 'react-apollo';
import moment from 'moment';

import {
    GET_CANCELLATION_DETAILS_START,
    GET_CANCELLATION_DETAILS_SUCCESS,
    GET_CANCELLATION_DETAILS_ERROR
} from '../constants';

const query = gql`
   query {
    getAllCancellation {
      id
      policyContent
      isEnable
    }
  }
`;

export function getCancellationDetails() {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: GET_CANCELLATION_DETAILS_START,
        });

        try {
            // Send Request to get listing data
            const { data } = await client.query({
                query,
                fetchPolicy: 'network-only',
            });

            if (data && data.getAllCancellation) {
                dispatch({
                    type: GET_CANCELLATION_DETAILS_SUCCESS,
                    payload: {
                        cancellationPolicies: data.getAllCancellation
                    }
                });
            } else {
                dispatch({
                    type: GET_CANCELLATION_DETAILS_ERROR,
                });
            }
        } catch (error) {
            dispatch({
                type: GET_CANCELLATION_DETAILS_ERROR,
                payload: {
                    error,
                },
            });
            return false;
        }

        return true;
    };
}

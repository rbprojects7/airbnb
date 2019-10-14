import {gql} from 'react-apollo';

import history from '../../core/history';
import {
  BOOKING_PROCESS_INITIALIZE,
} from '../../constants';

export function initializeBooking(chosenBlock) {

  return async (dispatch) => {
    dispatch({
      type: BOOKING_PROCESS_INITIALIZE,
      payload: {
        chosenBlock
      }
    });
    return true;
  };
}


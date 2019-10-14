import { gql } from 'react-apollo';
// Toaster
import { toastr } from 'react-redux-toastr';
import {
  CANCEL_RESERVATION_START,
  CANCEL_RESERVATION_SUCCESS,
  CANCEL_RESERVATION_STATE_ERROR
} from '../../constants';
import history from '../../core/history';
import { sendEmail } from '../../core/email/sendEmail';


export function cancel(
  cancellation,
  total,
  message,
  listTitle,
  cancelledDate,
  cancelledBy,
  currency,
  allReservationId
) {

  return async (dispatch, getState, { client }) => {
    let cancellationData = JSON.stringify(cancellation);
    let getReservationId = JSON.stringify(allReservationId);
    dispatch({
      type: CANCEL_RESERVATION_START,
    });

    try {

      const mutation = gql`
        mutation cancelByBlock(
		  $total: Float,
		  $currency: String,
		  $cancelledBy: String,
		  $message: String,
      $cancellationData: String,
      $getReservationId: String,
		){
		    cancelByBlock(
		      total: $total,
		      currency: $currency,
		      cancelledBy: $cancelledBy,
		      message: $message,
          cancellationData: $cancellationData,
          getReservationId: $getReservationId,
		    ) {
            status
		    }
		}
      `;

      const { data } = await client.mutate({
        mutation,
        variables: {
          total,
          currency,
          cancelledBy,
          message,
          cancellationData,
          getReservationId
        },
        /*refetchQueries: [
          {
            query: getAllReservationQuery,
            variables: {
              userType
            },
          }
        ]*/
      });

      if (data.cancelByBlock.status === '200') {
        dispatch({
          type: CANCEL_RESERVATION_SUCCESS,
        });
        toastr.success("Cancel Reservation", "Reservation cancelled successfully");
        history.push('/experience');
        // if (cancelledBy === 'host') {
        //   history.push('/experience');
        //   let content = {
        //     hostName,
        //     guestName,
        //     confirmationCode,
        //     checkIn,
        //     listTitle,
        //     refundToGuest,
        //     currency
        //   };
        //   await sendEmail(guestEmail, 'cancelledByHost', content);
        // } else {
        //   history.push('/experiences/current');
        //   let content = {
        //     hostName,
        //     guestName,
        //     confirmationCode,
        //     checkIn,
        //     listTitle,
        //     payoutToHost,
        //     currency,
        //     cancellation,
        //     cancelledDate,
        //     message
        //   };
        //   await sendEmail(hostEmail, 'cancelledByGuest', content);
        // }
      }

      if (data.cancelByBlock.status === '400') {
        dispatch({
          type: CANCEL_RESERVATION_SUCCESS,
        });
        toastr.error("Cancel Reservation", "It looks like your reservation is already updated!");
      }

    } catch (error) {
      dispatch({
        type: CANCEL_RESERVATION_STATE_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
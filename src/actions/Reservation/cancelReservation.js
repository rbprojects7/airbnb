import {gql} from 'react-apollo';
// Toaster
import {toastr} from 'react-redux-toastr';
import {
  CANCEL_RESERVATION_START,
  CANCEL_RESERVATION_SUCCESS,
  CANCEL_RESERVATION_STATE_ERROR
} from '../../constants';
import history from '../../core/history';
import {sendEmail} from '../../core/email/sendEmail';


export function cancel(
		reservationId, 
		cancellationPolicy, 
		refundToGuest,
		payoutToHost, 
    guestServiceFee, 
    hostServiceFee, 
    total, 
    currency,
   	threadId, 
    cancelledBy,
    message,
    checkIn,
  	checkOut,
  	guests,
    listTitle,
    confirmationCode,
    hostName,
    guestName,
    hostEmail,
    guestEmail,
    cancellation,
    cancelledDate
	) {

  return async (dispatch, getState, { client }) => {
    let cancellationData = JSON.stringify(cancellation);
    dispatch({
      type: CANCEL_RESERVATION_START,
    });

    try {

      const mutation = gql`
        mutation cancelReservation(
		  $reservationId: Int!,
		  $cancellationPolicy: String,
		  $refundToGuest: Float,
		  $payoutToHost: Float,
		  $guestServiceFee: Float,
		  $hostServiceFee: Float,
		  $total: Float!,
		  $currency: String!,
		  $threadId: Int!,
		  $cancelledBy: String!,
		  $message: String!,
		  $checkIn: String!,
      $checkOut: String!,
      $guests: Int!,
      $cancellationData: String
		){
		    cancelReservation(
		      reservationId: $reservationId,
		      cancellationPolicy: $cancellationPolicy,
		      refundToGuest: $refundToGuest,
		      payoutToHost: $payoutToHost,
		      guestServiceFee: $guestServiceFee,
		      hostServiceFee: $hostServiceFee,
		      total: $total,
		      currency: $currency,
		      threadId: $threadId,
		      cancelledBy: $cancelledBy,
		      message: $message,
		      checkIn: $checkIn,
		      checkOut: $checkOut,
          guests: $guests,
          cancellationData: $cancellationData
		    ) {
            status
		    }
		}
      `;

      const {data} = await client.mutate({
        mutation,
        variables: {
          reservationId, 
    			cancellationPolicy, 
    			refundToGuest,
    			payoutToHost, 
  		    guestServiceFee, 
  		    hostServiceFee, 
  		    total, 
  		    currency,
  		   	threadId, 
  		    cancelledBy,
  		    message,
  		    checkIn,
      		checkOut,
          guests,
          cancellationData
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

      if(data.cancelReservation.status === '200'){
        dispatch({
          type: CANCEL_RESERVATION_SUCCESS,
        }); 
        toastr.success("Cancel Reservation", "Reservation cancelled successfully");
        if(cancelledBy === 'host'){
          history.push('/reservation/current');
          let content = {
            hostName,
            guestName,
            confirmationCode,
            checkIn,
            listTitle,
            refundToGuest,
            currency
          };
          await sendEmail(guestEmail, 'cancelledByHost', content);
        } else {
          history.push('/experiences/current');
          let content = {
            hostName,
            guestName,
            confirmationCode,
            checkIn,
            listTitle,
            payoutToHost,
            currency,
            cancellation,
            cancelledDate,
            message
          };
          await sendEmail(hostEmail, 'cancelledByGuest', content);
        }
      }

      if(data.cancelReservation.status === '400'){
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
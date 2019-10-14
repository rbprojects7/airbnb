import { cancel } from '../../actions/Reservation/cancelByBlock';

async function submit(values, dispatch) {
  // console.log('vallllll',values)
  dispatch(cancel(
    values.cancellation,
    values.total,
    values.message,
    values.listTitle,
    values.cancelledDate,
    values.cancelledBy,
    values.currency,
    values.allReservationId
  )
  );
  //dispatch(reset('PaymentForm'));
}

export default submit;
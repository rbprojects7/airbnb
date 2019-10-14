import {makePayment} from '../../../actions/booking/makePayment';

async function submit(values, dispatch) {
    const paymentType = values.paymentType;
    const name = values.paymentType == 2 ? values.name : null;
    const cardNumber = values.paymentType == 2 ? values.cardNumber : null;
    const cvv = values.paymentType == 2 ? values.cvv : null;
    const expiryDate = values.paymentType == 2 ? values.expiryDate : null;
    const expiryYear = values.paymentType == 2 ? values.expiryYear : null;
    const paymentCurrency = values.paymentType == 1 ? values.paymentCurrency : null;
    dispatch(makePayment(
    	values.listId,
      values.listTitle,
    	values.hostId,
    	values.guestId,
    	values.checkIn,
    	values.checkOut,
    	values.guests,
      values.message,
    	values.basePrice,
    	values.cleaningPrice,
    	values.currency,
      values.discount,
      values.discountType,
      values.guestServiceFee,
      values.hostServiceFee,
      values.total,
      values.bookingType,
      paymentCurrency,
      paymentType,
      name,
      cardNumber,
      cvv,
      expiryDate,
      expiryYear,
      values.guestEmail,
      values.sessionTimes,
      values.parent,
      values.child,
      values.startTime,
      values.endTime,
      values.blockId,
      values.blockUniqueId,
      values.totalSessionHours
  	)
  );
}

export default submit;

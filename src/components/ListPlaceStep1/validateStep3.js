
import messages from '../../locale/messages';


const validateStep3 = values => {

	const errors = {};

	if (Number(values.checkInStart) >= Number(values.checkInEnd)) {
		errors.checkInStart = messages.advanceNoticeError;
	}

	if (Number(values.checkInStart) < 8 || Number(values.checkInStart) > 25) {
		errors.checkInStart = messages.advanceNoticeInvalid;
	}

	if (Number(values.checkInEnd) < 8 || Number(values.checkInEnd) > 25) {
		errors.checkInEnd = messages.advanceNoticeInvalid;
	}

	if (!values.basePrice) {
		errors.basePrice = messages.basePriceRequired;
	}

	// if (isNaN(values.basePrice) || (parseInt(values.basePrice, 10) < 1)) {
	// 	errors.basePrice = messages.basePriceInvalid;
	// }

	if (isNaN(values.basePrice) || (parseFloat(values.basePrice, 10) < 0)) {
		errors.basePrice = messages.basePriceInvalid;
	}

	if (values.cleaningPrice) {
		if (isNaN(values.cleaningPrice) || (parseInt(values.cleaningPrice, 10) < 0)) {
			errors.cleaningPrice = messages.cleaningPriceInvalid;
		}
	}

	if (values.weeklyDiscount) {
		if (isNaN(values.weeklyDiscount) || (parseInt(values.weeklyDiscount, 10) < 0) || parseInt(values.weeklyDiscount, 10) > 99) {
			errors.weeklyDiscount = messages.discountInvalid;
		}
	}

	if (values.monthlyDiscount) {
		if (isNaN(values.monthlyDiscount) || (parseInt(values.monthlyDiscount, 10) < 0) || parseInt(values.monthlyDiscount, 10) > 99) {
			errors.monthlyDiscount = messages.discountInvalid;
		}
	}


  /*if(values.weeklyDiscount) {
  	if(values.weeklyDiscount != parseInt(values.weeklyDiscount, 10)){
  	  errors.weeklyDiscount = messages.discountInvalid;
  	}
  	if(parseInt(values.weeklyDiscount, 10) < 0 || parseInt(values.weeklyDiscount, 10) > 99){
  	  errors.weeklyDiscount = messages.discountInvalid;
  	}
  }

  if(values.monthlyDiscount) {
  	if(values.monthlyDiscount != parseInt(values.monthlyDiscount, 10)){
  	  errors.monthlyDiscount = messages.discountInvalid;
  	}
  	if(parseInt(values.monthlyDiscount, 10) < 0 || parseInt(values.monthlyDiscount, 10) > 99){
  	  errors.monthlyDiscount = messages.discountInvalid;
  	}
  }*/

	if (values.minNight > values.maxNight) {
		errors.minNight = 'Minimum nights can`t be higher than maximum nights';
	}


	//console.log('vall',values.cancellationPolicy,values.cancellationDescription)
	if ((!values.cancellationPolicy || (values.cancellationPolicy && values.cancellationPolicy.length == 0)) && (!values.cancellationDescription || values.cancellationDescription == "")) {
		errors.cancellationPolicy = messages.cancellationPolicyRequired;
	}

	// if (!values.cancellationDescription || values.cancellationDescription == "") {
	// 	errors.cancellationDescription = messages.cancellationDescriptionRequired;
	// }

	// if (!values.blocks || !values.blocks.length) {
	// 	errors.blocks = 'Please add block with dates of teaching sessions.';
	// }
	
  return errors;
}

export default validateStep3;

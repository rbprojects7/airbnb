import messages from '../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.firstName) {
    errors.firstName = messages.firstNameRequired;
  } else if (values.firstName.toString().trim() == "") {
    errors.firstName = messages.inputBlank;
  }

  if (!values.lastName) {
    errors.lastName = messages.lastNameRequired;
  } else if (values.lastName.toString().trim() == "") {
    errors.lastName = messages.inputBlank;
  }

  if (!values.email) {
    errors.email = messages.emailRequired;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = messages.emailInvalid;
  }

  // if (!values.gender) {
  //   errors.gender = messages.genderRequired;
  // }
  

  if (!values.phoneNumber) {
    errors.phoneNumber = messages.phoneNumberRequired;
  } else if (values.phoneNumber.toString().trim() == "") {
    errors.phoneNumber = messages.inputBlank;
  }

  // if (!values.preferredLanguage) {
  //   errors.preferredLanguage = messages.preferredLanguageRequired;
  // }

  if (!values.preferredCurrency) {
    errors.preferredCurrency = messages.preferredCurrencyRequired;
  }

  // if (!values.location) {
  //   errors.location = messages.locationRequired;
  // } else if (values.location.toString().trim() == "") {
  //   errors.location = messages.inputBlank;
  // }

  // if (!values.homeTown) {
  //   errors.homeTown = messages.editProfileHomeTownRequired;
  // } else if (values.homeTown.toString().trim() == "") {
  //   errors.homeTown = messages.inputBlank;
  // }

  if (!values.info) {
    errors.info = messages.infoRequired;
  } else if (values.info.toString().trim() == "") {
    errors.info = messages.inputBlank;
  }

  // if (!values.dateOfBirth) {
  //   errors.dateOfBirth = messages.dateOfBirthRequired;
  // }

   if (!values.postCode) {
    errors.postCode = messages.zipcodeRequired;
  }

  if (!values.iamOverEighteen) {
    errors.iamOverEighteen = messages.requiredField;
  }
  

  return errors
}

export default validate

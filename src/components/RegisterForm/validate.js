import messages from '../../locale/messages';
// Helper
import PopulateData from '../../helpers/populateData';

const validate = values => {

  const errors = {}

  if (!values.firstName) {
    errors.firstName = messages.firstNameRequired;
  }

  if (!values.lastName) {
    errors.lastName = messages.lastNameRequired;
  }

  if (!values.email) {
    errors.email = messages.emailRequired;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = messages.emailInvalid;
  }

  if (!values.password) {
    errors.password = messages.passwordRequired;
  } else if (values.password.length < 8) {
    errors.password = messages.passwordInvalid;
  }

  /*if (!values.month) {
    errors.month = messages.monthRequired;
  }

  if (!values.day) {
    errors.day = messages.dayRequired;
  }

  if (!values.year) {
    errors.year = messages.yearRequired;
  }

  if (values.year) {
    let now = new Date();
    let currentYear = now.getFullYear();
    let difference = currentYear - values.year;
    if(difference < 18) {
      errors.year = messages.mustBe18OrOld;
    }
  }

  if(values.year && values.month && values.day) {
    if(!PopulateData.isValidDate(values.year, values.month, values.day)) {
      errors.day = messages.WrongDayChosen;
    }
  }*/

  return errors
}

export default validate

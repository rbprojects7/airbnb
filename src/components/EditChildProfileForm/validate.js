import messages from '../../locale/messages';

const validate = values => {

  const errors = {};

  if (!values.firstName) {
    errors.firstName = messages.firstNameRequired;
  }

  if (!values.lastName) {
    errors.lastName = messages.lastNameRequired;
  }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = messages.emailInvalid;
  }

  if (!values.preferredName) {
    errors.preferredName = messages.preferredNameRequired;
  }

  if (!values.month || !values.day || !values.year) {
    errors.birthday = messages.birthdayRequired;
  }

  return errors
};

export default validate

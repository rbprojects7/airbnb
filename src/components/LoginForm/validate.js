import messages from '../../locale/messages';

const validate = (values) => {
  const errors = {};

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

  return errors;
};

export default validate;

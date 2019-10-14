import messages from '../../locale/messages';


const validateStep2 = values => {

  const errors = {}

//   if (!values.title) {
//     errors.title = messages.titleRequired;
//   }

// if (!values.description) {
//   errors.description = messages.descriptionRequired;
// }
 if (!values.country) {
    errors.country = messages.countryRequired;
  }

  if (!values.state) {
    errors.state = messages.stateRequired;
  }

  if (!values.city) {
    errors.city = messages.cityRequired;
  }

  if (!values.street) {
    errors.street = messages.streetRequired;
  }

  if (!values.zipcode) {
    errors.zipcode = messages.zipcodeRequired;
  }
  
  return errors
}

export default validateStep2

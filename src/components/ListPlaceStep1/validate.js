import messages from '../../locale/messages';


const validate = values => {

  const errors = {}

  // if (!values.houseType) {
  //   errors.houseType = messages.houseTypeRequired;
  // }

  if (!values.title) {
    errors.title = messages.titleRequired;
  }

  if (!values.description) {
    errors.description = messages.descriptionRequired;
  }
  if (values.maximumSize < values.minimumSize ) {
    errors.maximumSize = messages.maximumSizeInvalid;
  }
  if(!values.verbalStrength && !values.logicStrength && !values.visualStrength 
    && !values.musicalStrength && !values.bodyStrength && !values.peopleStrength 
    && !values.innerStrength && !values.nauralisticStrength){
    errors.verbalStrength =  messages.verbalStrengthRequired;
  }
  // if(values.learningAims) {
  //   if (values.learningAims.length > 12 || values.learningAims.length < 4) {
  //     errors.learningAims = messages.learningAimsRangeError;
  //   }

  //   if (values.learningAims.indexOf('') !== -1) {
  //     errors.learningAims = messages.learningAimsEmptyError;
  //   }
  // }

  return errors
}

export default validate

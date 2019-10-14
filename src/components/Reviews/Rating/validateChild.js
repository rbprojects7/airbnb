import messages from '../../../locale/messages';

const validateChild = values => {

    const errors = {};

    console.log("values",values);

    // if (!values.learningAim) {
    //     errors.learningAim = messages.reviewError1;
    // }

    // if (!values.rating) {
    //     errors.rating = messages.reviewError2;
    // }

    return errors;
};

export default validateChild;

import messages from '../../../locale/messages';
import valid from 'card-validator';

const validate = (values) => {

    const errors = {};

    if (!values.message) {
        errors.message = messages.contacthostError2;
    }

    if (values.paymentType == 1 && !values.paymentCurrency) {
        errors.paymentCurrency = messages.currencyError;
    }

    if (values.paymentType == 2) {
        if (!values.name) {
            errors.name = messages.required;
        }

        if (!values.cardNumber) {
            errors.cardNumber = messages.required;
        } else {
            var numberValidation = valid.number(values.cardNumber);
            if (!numberValidation.isValid) {
                errors.cardNumber = messages.invalid;
            }
        }

        if (!values.expiryDate) {
            errors.expiryDate = messages.required;
        } else {
            const monthValidation = valid.expirationMonth(values.expiryDate);
            if (!monthValidation.isValid) {
                errors.expiryDate = messages.invalid;
            }
        }

        if (!values.expiryYear) {
            errors.expiryYear = messages.required;
        } else {
            const yearValidation = valid.expirationYear(values.expiryYear);
            if (!yearValidation.isValid) {
                errors.expiryYear = messages.invalid;
            }
        }

        if (!values.cvv) {
            errors.cvv = messages.required;
        } else {
            let maximumLength = 3;
            var numberValidation = valid.number(values.cardNumber);
            if (values.cardNumber && numberValidation.isValid) {
                const cardType = valid.number(values.cardNumber);
                if (cardType.card.type === 'american-express') {
                    maximumLength = 4;
                }
            }
            const cvvValidation = valid.cvv(values.cvv, maximumLength);
            if (!cvvValidation.isValid) {
                errors.cvv = messages.invalid;
            }
        }
        if(!values.parent && !values.child.length > 0){
            errors.parent = messages.childrequired;
        }
    }


    return errors;
};

export default validate;

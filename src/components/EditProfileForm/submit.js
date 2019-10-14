// Redux Form
import { SubmissionError } from 'redux-form';

// Language
import { FormattedMessage } from 'react-intl';

// Fetch request
import fetch from '../../core/fetch';

// Redux
import { setRuntimeVariable } from '../../actions/runtime';
import { loadAccount } from '../../actions/account';

// Toaster
import {toastr} from 'react-redux-toastr';

// Helper
import PopulateData from '../../helpers/populateData';

// Locale
import messages from '../../locale/messages';

async function submit(values, dispatch) {

  // if(!values.day){
  //   //throw new SubmissionError({ _error: messages.birthDayRequired });
  //   toastr.error("Update Profile Failed", "Birth day field is missing");
  //   return false;
  // }

  // if(!values.year){
  //   //throw new SubmissionError({ _error: messages.birthDayRequired });
  //   toastr.error("Update Profile Failed", "Birth year field is missing");
  //   return false;
  // }
  
  // let monthValidation = parseInt(values.month);
  // if(isNaN(monthValidation)){
  //   toastr.error("Update Profile Failed", "Birth month field is missing");
  //   return false;
  // }

  // if (values.year) {
  //   let now = new Date();
  //   let currentYear = now.getFullYear();
  //   let difference = currentYear - values.year;
  //   if(difference < 18) {
  //     //throw new SubmissionError({ _error: messages.mustBe18OrOld });
  //     toastr.error("Update Profile Failed", "Sorry, you must be 18 years old");
  //     return false;
  //   }
  // }

  // if(values.year && values.month && values.day) {
  //   if(!PopulateData.isValidDate(values.year, values.month, values.day)) {
  //     //throw new SubmissionError({ _error: messages.WrongDayChosen });
  //     toastr.error("Update Profile Failed", "Invalid date of birth, please fill the valid data");
  //     return false;
  //   }
  // }

  const query = `
  query (
    $firstName:String,
    $lastName:String,
  	$gender: String,
    $dateOfBirth: String,
    $email: String!,
  	$phoneNumber: String,
  	$preferredLanguage: String,
  	$preferredCurrency: String,
  	$location: String,
    $info: String,
    $homeTown: String,
    $iamOverEighteen: Int,
    $postCode: String,
  ) {
      userEditProfile (
        firstName:$firstName,
        lastName:$lastName,
        gender: $gender,
        dateOfBirth: $dateOfBirth,
        email: $email,
        phoneNumber: $phoneNumber,
        preferredLanguage: $preferredLanguage,
        preferredCurrency: $preferredCurrency,
        location: $location,
        info: $info,
        homeTown: $homeTown,
        iamOverEighteen: $iamOverEighteen,
        postCode: $postCode,
      ) {
        status
      }
    }
    `;

  const { year, month, day} = values;
  //let dateOfBirth = (Number(month) + 1) + "-" + year + "-" + day;
  let dateOfBirth = year + "-" + (Number(month) + 1) + "-" + day;
  let firstNameValue = values.firstName ? values.firstName.trim() : values.firstName;
  let lastNameValue = values.lastName ? values.lastName.trim() : values.lastName;
  let phoneNumber = values.phoneNumber ? values.phoneNumber.trim() : values.phoneNumber;
  let location = values.location ? values.location.trim() : values.location;
  let infoValue = values.info ? values.info.trim() : values.info;
  let homeTown = values.homeTown ? values.homeTown.trim() : values.homeTown;
  const params = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    gender: values.gender,
    dateOfBirth: dateOfBirth,
    email: values.email,
    phoneNumber: phoneNumber,
    //preferredLanguage: values.preferredLanguage,
    preferredCurrency: values.preferredCurrency,
    location: location,
    info: infoValue,
    homeTown: homeTown,
    iamOverEighteen: values.iamOverEighteen,
    postCode: values.postCode,
  };
  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: params
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if(data.userEditProfile.status == "success") {
    dispatch(loadAccount());
    toastr.success("Update Profile", "Your changes are updated!");
  } else if (data.userEditProfile.status == "email") {
      //throw new SubmissionError({ _error: messages.emailAlreadyExists });
      toastr.error("Update Profile Failed", "Email already exist, please try another email address!");
  } else if (data.userEditProfile.status == "notLoggedIn") {
      dispatch(setRuntimeVariable({
        name: 'isAuthenticated',
        value: false,
      }));
      toastr.error("Update Profile Failed", "You are not logged in, please login and try again!");
      //throw new SubmissionError({ _error: messages.notLoggedIn });
  } else {
      throw new SubmissionError({ _error: messages.somethingWentWrong });
      toastr.error("Update Profile Failed", "Sorry, something went wrong! Reload this page and try again!");
  }

}

export default submit;

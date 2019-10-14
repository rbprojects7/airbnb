// Fetch request
import fetch from '../../core/fetch';

// Redux
import { getChildren } from '../../actions/Children/getChildren';
import { closeAddChildModal } from '../../actions/modalActions';

// Toaster
import {toastr} from 'react-redux-toastr';

// Helper
import PopulateData from '../../helpers/populateData';

import { SubmissionError, reset } from 'redux-form';


async function createChild(values, dispatch, props) {
  
  if(!values.day){
    toastr.error("Update Profile Failed", "Birth day field is missing");
    return false;
  }

  if(!values.year){
    toastr.error("Update Profile Failed", "Birth year field is missing");
    return false;
  }

  let monthValidation = parseInt(values.month);
  if(isNaN(monthValidation)){
    toastr.error("Update Profile Failed", "Birth month field is missing");
    return false;
  }

  if (values.year) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const difference = currentYear - values.year;
    if(difference > 18) {
      toastr.error("Update Profile Failed", "Sorry, your child must be under 18 years old");
      return false;
    }
  }

  if(values.year && values.month && values.day) {
    if(!PopulateData.isValidDate(values.year, values.month, values.day)) {
      toastr.error("Update Profile Failed", "Invalid date of birth, please fill the valid data");
      return false;
    }
  }

  const query = `
  mutation CreateChild (
    $parentId: String,
    $firstName: String,
    $lastName: String,
  	$preferredName: String,
    $birthday: String,
    $email: String,
  	$preferences: String
  ) {
      CreateChild (
        parentId: $parentId,
        firstName: $firstName,
        lastName: $lastName,
        preferredName: $preferredName,
        birthday: $birthday,
        email: $email,
        preferences: $preferences
      ) {
        status
      }
    }
    `;

  const parentId =  props.account && props.account.data && props.account.data.userId;
  const { year, month, day} = values;
  let birthday = year + "-" + (Number(month) + 1) + "-" + day;

  const params = {
    parentId,
    firstName: values.firstName,
    lastName: values.lastName,
    preferredName: values.preferredName,
    birthday: birthday,
    email: values.email,
    preferences: values.preferences
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

  if(data && data.CreateChild &&  data.CreateChild.status && data.CreateChild.status === 'success') {
    console.log('data',data)
   await dispatch(getChildren());
   console.log('afterGetChild')
   await dispatch(closeAddChildModal());
   await toastr.success("Child profile saved", "Your changes are updated!");
    dispatch(reset('EditChildProfileForm'));
  } else {
      toastr.error("Update Profile Failed", "Sorry, something went wrong! Reload this page and try again!");
  }

}

export default createChild;

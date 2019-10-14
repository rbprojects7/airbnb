// Redux Form
import { SubmissionError } from 'redux-form';

// Fetch request
import fetch from '../../core/fetch';

// Locale
import messages from '../../locale/messages';

// Redux Action
import { getListingData } from '../../actions/getListing';
import { getListingDataStep2 } from '../../actions/getListingDataStep2';
import { manageListingSteps } from '../../actions/manageListingSteps';
import { getListingFieldsValues } from '../../actions/getListingFieldsValues';
import {setLoaderStart, setLoaderComplete} from '../../actions/loader/loader';

// For Redirect
import history from '../../core/history';

async function updateStep2(values, dispatch) {

  dispatch(setLoaderStart('updateListing'));
  const query = `query (
    $id: Int,
    $country:String,
    $street:String,
    $buildingName:String,
    $city:String,
    $state:String,
    $zipcode:String,
  	$lat: Float,
  	$lng: Float,
  	$isMapTouched: Boolean,
    $coverPhoto: Int,
    $amenities: [Int],
    $safetyAmenities: [Int],
  ) {
      updateListingStep2 (
        id: $id,
        country: $country
        street: $street
        buildingName: $buildingName
        city: $city
        state: $state
        zipcode: $zipcode
        lat: $lat
        lng: $lng
        isMapTouched: $isMapTouched,
        coverPhoto: $coverPhoto,
        amenities: $amenities,
        safetyAmenities: $safetyAmenities,
      ) {
        status
      }
    }`;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: values
    }),
    credentials: 'include'
  });

  const { data } = await resp.json();

  if(data.updateListingStep2.status == "success") {
    history.push('/become-a-mentor/' + values.id + '/home');
    dispatch(getListingDataStep2(values.id));
    dispatch(manageListingSteps(values.id, 2));
    dispatch(getListingFieldsValues("3", values.id));
    dispatch(setLoaderComplete('updateListing'));
  } else if (data.updateListingStep2.status == "notLoggedIn") {
      dispatch(setLoaderComplete('updateListing'));
      throw new SubmissionError({ _error: messages.notLoggedIn });
  } else {
      dispatch(setLoaderComplete('updateListing'));
      throw new SubmissionError({ _error: messages.somethingWentWrong });
  }

}

export default updateStep2;

// Redux Form
import { SubmissionError } from 'redux-form';

// Fetch request
import fetch from '../../core/fetch';

// Locale
import messages from '../../locale/messages';


// Redux Action
import { getListingData } from '../../actions/getListing';
import { manageListingSteps } from '../../actions/manageListingSteps';
import { getListingFieldsValues } from '../../actions/getListingFieldsValues';
import {setLoaderStart, setLoaderComplete} from '../../actions/loader/loader';

// For Redirect
import history from '../../core/history';
async function updateStep1(values, dispatch) {
  dispatch(setLoaderStart('updateListing'));
  const query = `query (
  	$id: Int,
    $roomType:String,
    $houseType:String,
    $residenceType:String,
    $bedrooms:String,
    $buildingSize:String,
    $bedType:String,
    $beds:Int,
    $personCapacity:Int,
    $bathrooms:Float,
    $bathroomType:String,
    $spaces: [Int],
    $minimumAge: Int,
    $maximumAge: Int,
    $title:String,
    $description:String,
    $verbalStrength: Int,
    $logicStrength: Int,
    $visualStrength: Int,
    $musicalStrength: Int,
    $bodyStrength: Int,
    $peopleStrength: Int, 
    $innerStrength: Int,
    $nauralisticStrength: Int,
    $verbalDescription: String,
    $logicDescription: String,
    $visualDescription: String,
    $musicalDescription: String,
    $bodyDescription: String,
    $peopleDescription: String,
    $innerDescription: String,
    $nauralisticDescription: String,


   ) {
      updateListingStep1 (
        id: $id,
        roomType:$roomType,
        houseType:$houseType,
        residenceType: $residenceType,
        bedrooms: $bedrooms,
        buildingSize: $buildingSize
        bedType: $bedType
        beds: $beds
        personCapacity: $personCapacity
        bathrooms: $bathrooms
        bathroomType: $bathroomType
        spaces: $spaces,
        minimumAge: $minimumAge,
        maximumAge: $maximumAge,        
        title:$title,
        description:$description,
        verbalStrength: $verbalStrength,
        logicStrength: $logicStrength,
        visualStrength: $visualStrength,
        musicalStrength: $musicalStrength,
        bodyStrength: $bodyStrength,
        peopleStrength: $peopleStrength, 
        innerStrength: $innerStrength,
        nauralisticStrength: $nauralisticStrength,
        verbalDescription: $verbalDescription,
        logicDescription: $logicDescription,
        visualDescription: $visualDescription,
        musicalDescription: $musicalDescription,
        bodyDescription: $bodyDescription,
        peopleDescription: $peopleDescription,
        innerDescription: $innerDescription,
        nauralisticDescription: $nauralisticDescription,

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

  if(data.updateListingStep1.status == "success") {
    history.push('/become-a-mentor/' + values.id +'/learning-aims');
    dispatch(getListingData(values.id));
    // dispatch(manageListingSteps(values.id, 1));
    dispatch(getListingFieldsValues("2", values.id));
    dispatch(setLoaderComplete('updateListing'));
  } else if (data.updateListingStep1.status == "notLoggedIn") {
      dispatch(setLoaderComplete('updateListing'));
      throw new SubmissionError({ _error: messages.notLoggedIn });
  } else {
      dispatch(setLoaderComplete('updateListing'));
      throw new SubmissionError({ _error: messages.somethingWentWrong });
  }

}

export default updateStep1;

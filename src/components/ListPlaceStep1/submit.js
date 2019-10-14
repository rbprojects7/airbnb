// Redux Form
import { SubmissionError } from 'redux-form';

// Fetch request
import fetch from '../../core/fetch';

// Locale
import messages from '../../locale/messages';


// For Redirect
import history from '../../core/history';

// Redux Action
import { getListingData } from '../../actions/getListing';
import { manageListingSteps } from '../../actions/manageListingSteps';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

async function submit(values, dispatch) {
  dispatch(setLoaderStart('location'));
  const query = `query (
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
    $minimumAge: Int,
    $maximumAge: Int,
    $title:String,
    $description:String,
    $spaces: [Int],
    $personalDescribe: String,
    $maximumSize: Int,
    $minimumSize: Int,
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
      createListing (
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
        minimumAge: $minimumAge,
        maximumAge: $maximumAge,
        title: $title,
        description: $description,
        spaces: $spaces,
        personalDescribe: $personalDescribe,
        maximumSize: $maximumSize,
        minimumSize: $minimumSize,
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
        id
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

  if(data.createListing.status == "success") {
    await dispatch(getListingData(data.createListing.id));
    await dispatch(manageListingSteps(data.createListing.id, 1));
    history.push(data.createListing.id + '/learning-aims');
    dispatch(setLoaderComplete('location'));
    await dispatch(setLoaderComplete('location'));
  } else if (data.createListing.status == "notLoggedIn") {
      throw new SubmissionError({ _error: messages.notLoggedIn });
  } else if (data.createListing.status == "adminLoggedIn") {
      throw new SubmissionError({ _error: messages.adminLoggedIn });
  } else {
      throw new SubmissionError({ _error: messages.somethingWentWrong });
  }

}

export default submit;

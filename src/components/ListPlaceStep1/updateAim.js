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
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';
import { isEmpty } from '../../helpers/isEmptyObject';
// For Redirect
import history from '../../core/history';
async function updateAim(values, dispatch) {
  let learningAims = JSON.stringify(values.learningAims);
  let variables = Object.assign({}, values, { learningAims: learningAims });
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
    $learningAims: [String]
   
   ) {
      updateListingAim (
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
        learningAims: $learningAims,
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
      variables
    }),
    credentials: 'include'
  });

  const { data } = await resp.json();

  if (data.updateListingAim.status == "success") {
    history.push('/become-a-mentor/' + values.id + '/group-size');
    dispatch(getListingData(values.id));
    dispatch(getListingFieldsValues("2", values.id));
    dispatch(setLoaderComplete('updateListing'));
  } else if (data.updateListingAim.status == "notLoggedIn") {
    dispatch(setLoaderComplete('updateListing'));
    throw new SubmissionError({ _error: messages.notLoggedIn });
  } else {
    dispatch(setLoaderComplete('updateListing'));
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  }

}

export default updateAim;

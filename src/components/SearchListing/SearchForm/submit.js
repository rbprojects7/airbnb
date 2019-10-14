
// Redux Form
import { SubmissionError } from 'redux-form';

// Redirection
import history from '../../../core/history';

// Fetch request
import fetch from '../../../core/fetch';

// Redux
import { getSearchResults, loadingSearchResults } from '../../../actions/getSearchResults';
import { showResults } from '../../../actions/mobileSearchNavigation';


async function submit(values, dispatch) {

  dispatch(loadingSearchResults());

  const query = 
  `query(
      $personCapacity: Int,
      $dates: String,
      $currentPage: Int,
      $lat: Float,
      $lng: Float,
      $roomType: [Int],
      $bedrooms: Int,
      $bathrooms: Int,
      $beds: Int,
      $amenities: [Int],
      $spaces: [Int],
      $houseRules: [Int],
      $priceRange: [Int],
      $geography: String,
      $bookingType: String
    ){
      SearchListing(
        personCapacity: $personCapacity,
        dates: $dates,
        currentPage: $currentPage
        lat: $lat,
        lng: $lng,
        roomType: $roomType,
        bedrooms: $bedrooms,
        bathrooms: $bathrooms,
        beds: $beds,
        amenities: $amenities,
        spaces: $spaces,
        houseRules: $houseRules,
        priceRange: $priceRange,
        geography: $geography,
        bookingType: $bookingType
      ) {
        count
        results {
          id
          title
          personCapacity
          lat
          lng
          beds
          coverPhoto
          bookingType
          reviewsCount,
          reviewsStarRating,
          listPhotos {
            id
            name
            type
            status
          }
          listingData {
            basePrice
            currency
          }
          settingsData {
            listsettings {
              id
              itemName
            }
          }
          wishListStatus
          isListOwner
        }
      }
    }
  `;



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
    credentials: 'include',
  });

  const { data } = await resp.json();
  
  if(data && data.SearchListing) {
    dispatch(getSearchResults(data.SearchListing));
    //dispatch(showResults());
  }

}

export default submit;

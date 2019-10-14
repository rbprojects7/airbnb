import { gql } from 'react-apollo';

import {
  GET_LISTING_DATA_STEP2_START,
  GET_LISTING_DATA_STEP2_SUCCESS,
  GET_LISTING_DATA_STEP2_ERROR } from '../constants';

import { initialize } from 'redux-form';

const query = gql`
  query ($listId:String!, $preview: Boolean) {
    UserListing (listId:$listId, preview: $preview) {
      id
      userId
      coverPhoto
      country
      street
      buildingName
      city
      state
      zipcode
      lat
      lng
      isMapTouched
      userAmenities {
        amenitiesId
        listsettings{
          itemName
          settingsType {
            typeName
          }
        }
      }
      userSafetyAmenities {
        safetyAmenitiesId
        listsettings{
          itemName
          settingsType {
            typeName
          }
        }
      }
      settingsData {
        id
        settingsId
        listsettings {
          id
          itemName
          settingsType {
            typeName
          }
        }
      }
    }
  }
`;

export function getListingDataStep2(listId) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: GET_LISTING_DATA_STEP2_START,
    });

    try {
      // Send Request to get listing data
      const { data } = await client.query({
        query,
        variables: { listId, preview: true },
        fetchPolicy: 'network-only',
      });

      let formValues = null;
      let settingFieldsData = {};
      let settingData = {};
      const amenities = [];
      const safetyAmenities = [];

      if (data && data.UserListing) {
        data.UserListing.settingsData.map((item, value) => {
          settingFieldsData[item.listsettings.settingsType.typeName] = item.settingsId;
        });

        if (data.UserListing.userAmenities.length > 0) {
          data.UserListing.userAmenities.map((item, value) => {
            amenities.push(parseInt(item.amenitiesId));
          });
          settingFieldsData = Object.assign({}, settingData, { amenities });
        }
        // Preparing for user safety amenities
        if (data.UserListing.userSafetyAmenities.length > 0) {
          data.UserListing.userSafetyAmenities.map((item, value) => {
            safetyAmenities.push(parseInt(item.safetyAmenitiesId));
          });
          settingFieldsData = Object.assign({}, settingData, { safetyAmenities });
        }

        formValues = Object.assign({}, data.UserListing, settingFieldsData, {amenities}, { safetyAmenities } );
        if (formValues != null) { 
        // Reinitialize the form values
        dispatch(initialize('ListPlaceStep2',formValues, true));

        // Dispatch a success action
        dispatch({
          type: GET_LISTING_DATA_STEP2_SUCCESS,
          step2DataIsLoaded: true,
          isExistingList: true,
          initialValuesLoaded: false,
          isLocationChosen:true,

        });
      }
      }
    } catch (error) {
      dispatch({
        type: GET_LISTING_DATA_STEP2_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }

    return true;
  };
}

import { gql } from 'react-apollo';

import {
  GET_LISTING_DATA_STEP3_START,
  GET_LISTING_DATA_STEP3_SUCCESS,
  GET_LISTING_DATA_STEP3_ERROR } from '../constants';

import { initialize } from 'redux-form';
import moment from 'moment';

const query = gql`
  query ($listId:String!, $preview: Boolean) {
    UserListing (listId:$listId, preview: $preview) {
      id
      userId
      bookingType
      isPublished
      houseRules {
        houseRulesId
      }
      listingData {
        bookingNoticeTime,
        checkInStart,
        checkInEnd,
        maxDaysNotice,
        minNight,
        maxNight,
        basePrice,
        cleaningPrice,
        currency,
        weeklyDiscount,
        monthlyDiscount,
        experienceType,
        cancellationDescription
      }
      blockedDates {
        blockedDates
        reservationId
      }
      blocks {
        id
        sessionTime {
          date
          startTime
          endTime
          id
          blockId
          blockUniqueId
        }
      }
      calendars {
        id
        name
        url
        listId
        status
      }
      cancellationPolicy{
        cancellationType
      }
    }
  }
`;

export function getListingDataStep3(listId) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: GET_LISTING_DATA_STEP3_START,
    });

    try {
      let formValues = null;
      let settingFieldsData = {};
      const houseRules = [];
      const updatedBlockedDates = [];
      const updatedDisabledDates = [];
      const blocks = [];
      let listData = {};
      const cancellationPolicy = [];


      // Send Request to get listing data
      const { data } = await client.query({
        query,
        variables: { listId, preview: true },
        fetchPolicy: 'network-only',
      });

      if (data && data.UserListing) {
        // Preparing List data
        listData = data.UserListing.listingData;

        // Preparing blocks and its sessions
        const newBlocks = [];
        for(let block of data.UserListing.blocks){
          const sessions = [];
          for(let session of block.sessionTime){
            sessions.push({
              date: session.date,
              endTime: moment(`${moment().format('D MMMM YYYY')} ${session.endTime}`),
              startTime: moment(`${moment().format('D MMMM YYYY')} ${session.startTime}`),
              id: session.id,
              blockId:session.blockId
            })
          }
          newBlocks.push(sessions);
        }

        // Preparing for house rules
        if (data.UserListing.houseRules.length > 0) {
          data.UserListing.houseRules.map((item, value) => {
            houseRules.push(parseInt(item.houseRulesId));
          });
          settingFieldsData = Object.assign({}, listData, { houseRules });
        }

        // Preparing for cancellation policy
        if (data.UserListing.cancellationPolicy.length > 0) {
          data.UserListing.cancellationPolicy.map((item, value) => {
            cancellationPolicy.push(parseInt(item.cancellationType));
          });
          settingFieldsData = Object.assign({}, listData, { cancellationPolicy });
        }

        // Preparing for blocked dates
        if (data.UserListing.blockedDates.length > 0) {
          data.UserListing.blockedDates.map((item, value) => {
            if(item.reservationId != null) {
              updatedDisabledDates.push(new Date(item.blockedDates));
            } else {
              updatedBlockedDates.push(new Date(item.blockedDates));
            }

          });
          settingFieldsData = Object.assign({}, listData, settingFieldsData,
          {
            disabledDates: updatedDisabledDates,
            blockedDates: updatedBlockedDates
          });
        }

        formValues = Object.assign({}, { ...data.UserListing, blocks: newBlocks }, settingFieldsData, listData);

        // Reinitialize the form values
        dispatch(initialize('ListPlaceStep3', formValues, true));

        // Dispatch a success action
        dispatch({
          type: GET_LISTING_DATA_STEP3_SUCCESS,
          step3DataIsLoaded: true,
          isExistingList: true,
          calendars: data.UserListing.calendars,
          newBlocks
        });
      } else {
        dispatch({
          type: GET_LISTING_DATA_STEP3_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_LISTING_DATA_STEP3_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

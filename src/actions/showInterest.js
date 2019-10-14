import { gql } from 'react-apollo';
import {
  UPDATE_SHOW_INTEREST_START,
  UPDATE_SHOW_INTEREST_SUCCESS,
  UPDATE_SHOW_INTEREST_ERROR
} from '../constants';

// To Refresh the Manage Listing Status
const query = gql`
query getShowInterest($listId: Int){
  getShowInterest(listId: $listId) {
      id
      listId
       beforeSunday
       middleSunday
       afterSunday
       beforeMonday
       middleMonday
       afterMonday
       beforeTuesday
       middleTuesday
       afterTuesday
       beforeWednesday
       middleWednesday
       afterWednesday
       beforeThursday
       middleThursday
       afterThursday
       beforeFriday
       middleFriday
       afterFriday
       beforeSaturday
       middleSaturday
       afterSaturday
  }
}`;

export function showInterest(listId, interestName, interestCount) {

  return async (dispatch, getState, { client }) => {
    dispatch({
      type: UPDATE_SHOW_INTEREST_START
    });
    const mutation = gql`
          mutation UpdateInterest($listId: Int!, $interestName: String!, $interestCount: String!) {
            UpdateInterest(listId: $listId, interestName: $interestName, interestCount: $interestCount) {
                status
            }
          }
          `;

          try {
      const { data } = await client.mutate({
        mutation,
        variables: {
          listId,
          interestName,
          interestCount
        },
        refetchQueries: [{ query,
          variables: {
            listId,
          },
         }]
      });
      
      if (data && data.UpdateInterest.status === "success") {
        dispatch({
          type: UPDATE_SHOW_INTEREST_SUCCESS
        });
      }
      else {
        dispatch({
          type: UPDATE_SHOW_INTEREST_ERROR
        });
      }
    }
    catch (error) {
      dispatch({
        type: UPDATE_SHOW_INTEREST_ERROR
      });
    }
  };
}
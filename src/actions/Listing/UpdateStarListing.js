import { gql } from 'react-apollo';
import {
  UPDATE_STAR_LISTING_START,
  UPDATE_STAR_LISTING_SUCCESS,
  UPDATE_STAR_LISTING_ERROR
} from '../../constants';
export function UpdateStarListing(listId, strengthName, strengthValue) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: UPDATE_STAR_LISTING_START
    });
    const mutation = gql`
          mutation UpdateStarListing($listId: Int!, $strengthName: String!, $strengthValue: String!) {
            UpdateStarListing(listId: $listId, strengthName: $strengthName, strengthValue: $strengthValue) {
                status
            }
          }
          `;
    try {
      const { data } = await client.mutate({
        mutation,
        variables: {
          listId,
          strengthName,
          strengthValue
        }
      });
      if (data && data.UpdateStarListing.status === "success") {
        dispatch({
          type: UPDATE_STAR_LISTING_SUCCESS
        });
      }
      else {
        dispatch({
          type: UPDATE_STAR_LISTING_ERROR
        });
      }
    }
    catch (error) {
      dispatch({
        type: UPDATE_STAR_LISTING_ERROR
      });
    }
  };
}
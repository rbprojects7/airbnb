import { gql } from 'react-apollo';
import {
  GET_BLOCK_DATA_START,
  GET_BLOCK_DATA_SUCCESS,
  GET_BLOCK_DATA_ERROR
} from '../../constants';
import { initialize } from 'redux-form';
export function getBlockData(learningData) {
  return async (dispatch, getState, { client }) => {
    try {
      let formValues = null;
      let dataLearning = [];
      if (learningData) {
        dataLearning['learningData'] = learningData;
      }
      formValues = Object.assign({}, dataLearning);
      //return finalItemBlock;
      if (formValues != null) {
        // Reinitialize the form values
        dispatch(initialize('RatingChildForm', formValues, true));
        dispatch({
          type: GET_BLOCK_DATA_SUCCESS
        });
      }
    }
    catch (error) {
      dispatch({
        type: GET_BLOCK_DATA_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }

  }
  return true;
}